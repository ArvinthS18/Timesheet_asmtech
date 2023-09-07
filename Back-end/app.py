from pymongo import MongoClient
from flask import Flask
from flask import jsonify,request
from bson.json_util import dumps ,ObjectId
import pandas as pd
from pandas.api.types import CategoricalDtype
from io import BytesIO
from xhtml2pdf import pisa
import os
import json
from flask_cors import CORS
from urllib.parse import quote_plus
from flask_pymongo import PyMongo


app = Flask(__name__)
CORS(app)
mongo = PyMongo()

def create_app():
    username = quote_plus("arvnmk")
    password = quote_plus("arvnmk@2001")

    # Construct the MONGO_URI with the escaped username and password
    app.config["MONGO_URI"] = f"mongodb+srv://{username}:{password}@cluster12.vs8xtbj.mongodb.net/HI?retryWrites=true&w=majority"

    mongo.init_app(app)
    print("hi")
    return app

app = create_app()

db = mongo.db.sample_1
SignUp = db.signup
Login_Details = db.login_details
Admin_DB = db.admin
Login_id = ""
Emp_Data = {}
backup_tablename = ""
view_backup_month = ""
view_backup_data = []

# @app.route('/')
# def flask_mongodb_atlas():
#     return "flask mongodb atlas!"


@app.route('/SignUp', methods=['POST','GET'])
def form_example():
    if request.method == 'POST':          
        employee_data = request.get_json()
        SignUp.insert_one(employee_data)   
        Login_Details.insert_one({employee_data['emp_id'] : employee_data['emp_password']}) 
        db.create_collection(str(request.get_json().get('emp_id')))
        db.create_collection(str(request.get_json().get('emp_id'))+"_backup")
        return jsonify({'success': "True"})

@app.route('/', methods=['POST','GET'])
def login():  
    global Login_id,Emp_Data
    Login_id = request.get_json().get('login_id')
    Login_password = request.get_json().get('login_password') 
    Employee_ID = Login_Details.find({Login_id : Login_password})       
    y = dumps(Employee_ID) 
    authors = json.loads(y)
    Emp_Data = SignUp.find_one({ "emp_id" : Login_id})
    if len(authors) == 1:    
        return jsonify({'success': "True" , "employee_data" : json.loads(dumps(Emp_Data))})
    else :
        return jsonify({'success': "False" , "employee_data" : ""})
    
@app.route('/timesheet', methods=['GET','POST'])
def timesheet():       
 
    if request.method == 'GET':
        global backup_tablename
        backup_tablename = Login_id+"_backup" 
        Emp_Timesheet = list(db[Login_id].find())        
        timesheet =  json.loads(dumps(Emp_Timesheet))
        emp_data = json.loads(dumps(Emp_Data))       
        return jsonify({'emp_data': emp_data , "timesheet" : timesheet})

    if request.method == 'POST':
        if request.get_json().get('For') == "backup":
            
            backups = []           
            Backupdates = request.get_json().get('Backup_dates')
            BackupMonth = request.get_json().get('Backup_month')            
            for date in Backupdates:
                data1 = db[Login_id].find_one({"date":date })
                backups.append(data1)
                db[Login_id].delete_one({"date":date })              
            db[backup_tablename].insert_one({"month" : BackupMonth, "Dates" : backups})
            result = list(db[Login_id].find())

        if request.get_json().get('For') == "addTimeSheet":
            dates = request.get_json().get('dates')            
            attendance = request.get_json().get('Attendance')
            no_of_hours = request.get_json().get('No.Of hours')
            Start = request.get_json().get('startTime')
            End = request.get_json().get('endTime')
            activitiy = request.get_json().get('Activity')
            for date in dates:
                db[Login_id].insert_one({"date":date , "Attendance" : attendance, "StartTime" : Start , "Stoptime" : End, "No_Of_hours": no_of_hours , "Activity" : activitiy})
            result = list(db[Login_id].find())       

        if request.get_json().get('For') == "search":
            Search_Ele = request.get_json().get('search_element')
            Emp_Timesheet = list(db[Login_id].find())        
            timesheet =  json.loads(dumps(Emp_Timesheet))
            z = []
            for x in timesheet:
                if Search_Ele.lower() in x['Activity'].lower():
                    z.append(x)
            result = z

        if request.get_json().get('For') == "filter":
            filter_Ele = request.get_json().get('filter_element')            
            Emp_Timesheet = list(db[Login_id].find())        
            timesheet =  json.loads(dumps(Emp_Timesheet))
            fil = []
            if filter_Ele == 'None':
                result = timesheet
            else:
                for x in timesheet:
                    if filter_Ele == x['Attendance']:
                        fil.append(x)                
                result = fil

        if request.get_json().get('For') == "submit":
            submit = []           
            Submit_Dates = request.get_json().get('Submit_dates')
            Submit_Month = request.get_json().get('Submit_month')            
            for date in Submit_Dates:
                data1 = db[Login_id].find_one({"date":date })
                submit.append(data1) 
            employee_Data = SignUp.find_one({ "emp_id" : Login_id})           
            Admin_DB.insert_one({"month" : Submit_Month, "Dates" : submit , "employee_data" : json.loads(dumps(employee_Data)), "status" : "Not Viewed"})


        return json.loads(dumps(result))

@app.route('/export', methods=['GET','POST'])
def export():   
    if request.method == 'GET':
        result = list(db[backup_tablename].find())        
        backupdata = json.loads(dumps(result))
        return backupdata
    if request.method == 'POST':
        Dates = request.get_json().get('dates')
        File_Name = request.get_json().get('file_name')
        File_Format = request.get_json().get('file_format')
        delete_backup = request.get_json().get('delete_backup')
        For = request.get_json().get('For')
        if File_Format == '.xlsx':
            export_datas = []
            for date in Dates:
                data1 = db[Login_id].find_one({"date":date },{"_id":0,"StartTime":0,"Stoptime":0})
                if data1:
                    export_datas.append(data1)
            df = pd.DataFrame(export_datas)
            df.to_excel("/home/asmuser/Downloads/"+File_Name+File_Format) 
        if File_Format == '.pdf':
            export_datas = []
            for date in Dates:
                data1 = db[Login_id].find_one({"date":date },{"_id":0,"StartTime":0,"Stoptime":0})
                if data1:
                    export_datas.append(data1)
            df = pd.DataFrame(export_datas)
            df.to_excel("/home/asmuser/Downloads/"+File_Name+".xlsx") 

            pdf = pd.read_excel("/home/asmuser/Downloads/"+File_Name+".xlsx")
            html = pdf.to_html(index=False)
            pdf_file = BytesIO()
            pisa.CreatePDF(BytesIO(html.encode()), pdf_file)
            pdf_data = pdf_file.getvalue()
            os.remove("/home/asmuser/Downloads/"+File_Name+".xlsx")
            with open("/home/asmuser/Downloads/"+File_Name+".pdf", "wb") as f:
                f.write(pdf_data)
        if  For == "Delete_Backup":
            db[backup_tablename].delete_one({"month" : delete_backup})    
            result = list(db[backup_tablename].find())    
            backupdata = json.loads(dumps(result))
            return backupdata
        if  For == "View_Backup":
            view_backup = request.get_json().get('view_backup')
            global view_backup_month    
            view_backup_month = view_backup

        return "0"

@app.route('/view_backup', methods=['GET','POST'])
def viewBackUp():   
    global view_backup_data
    if request.method == 'GET':      
        result = list( db[backup_tablename].find({"month" : view_backup_month}))   
        dates = result[0]['Dates']
        view_backup_data = []
        for d in dates:
            if d:
                view_backup_data.append(d)
        backupdata = json.loads(dumps(view_backup_data))
        return backupdata
    if request.method == 'POST':
        Search_Ele = request.get_json().get('search_element')
        z = []
        for x in view_backup_data:
            if Search_Ele.lower() in x['Activity'].lower():
                z.append(x)
        return json.loads(dumps(z))
    return "0"

@app.route('/settings', methods=['GET','POST'])
def settings():   
    if request.method == 'POST':
        Image = request.get_json().get('image')
        new = {"emp_id" : Login_id }
        condition = {"$set": {"image" : Image}}
        SignUp.update_one(new,condition)
        Emp = SignUp.find_one({ "emp_id" : Login_id})
        emp_data = json.loads(dumps(Emp))
        return emp_data
    if request.method == 'GET':
        Emp = SignUp.find_one({ "emp_id" : Login_id})
        emp_data = json.loads(dumps(Emp))
        return emp_data

@app.route('/navbar', methods=['GET'])
def navbar():   
    if request.method == 'GET':
        Emp = SignUp.find_one({ "emp_id" : Login_id})
        emp_data = json.loads(dumps(Emp))
        return emp_data
    
@app.route('/tsa_timesheet', methods=['GET','POST'])
def tsa_timesheet():   
    if request.method == 'GET':
        d ={"Present" : 0 , "Absent" : 0 ,"Working_days" : 0, "Public_Holidays" : 0}
        Submited_Data = Admin_DB.find({},{"employee_data" : {"image" : 0}})
        data = json.loads(dumps(Submited_Data))
        return data
    
    if request.method == 'POST':
        For = request.get_json().get('For')
        if For == 'delete':
            delete_id = request.get_json().get('data_id')
            Admin_DB.delete_one({"_id" : ObjectId(delete_id)})
            Submited_Data = Admin_DB.find({},{"employee_data" : {"image" : 0}})
            data = json.loads(dumps(Submited_Data))
            return data
        if For == 'view':
            d ={"Present" : 0 , "Absent" : 0 ,"Comp_Off" : 0, "Public_Holidays" : 0,"Week_End" : 0,"Working_Days" : 0 , "Billable_Days" : 0}
            data_id = request.get_json().get('data_id')
            Submited_Data = Admin_DB.find_one({"_id" : ObjectId(data_id)},{"employee_data" : {"image" : 0}})
            data = json.loads(dumps(Submited_Data))
            
            for data_item in data['Dates']:
              if data_item:
                 if (data_item['Attendance']) == 'Present':
                     d['Present'] += 1
                 elif (data_item['Attendance']) == 'Absent':
                     d['Absent'] += 1
                 elif (data_item['Attendance']) == 'Comp-Off':
                     d['Comp_Off'] += 1
                 elif (data_item['Attendance']) == 'Public-Holiday':
                     d['Public_Holidays'] += 1
                 elif (data_item['Attendance']) == 'Week-End':
                     d['Week_End'] += 1
                     
            d['Working_Days'] = len(data['Dates']) - (d['Comp_Off'] + d['Public_Holidays'] + d['Week_End'])  
            d['Billable_Days'] = d['Working_Days'] - d['Absent'] 
         
            # agregate = Admin_DB.aggregate([
            #     { "$unwind": "$Dates" }, 
            #     { "$match": { "Dates.Attendance": "Present" , "_id" : ObjectId(data_id)} }, 
            #     { "$group": {"_id" : "", "count": { "$sum": 1 } } } 
            #     ])
            # print(json.loads(dumps(agregate)),"----------")

            return jsonify({"all_data" :data , "calculation" : d})
        
        if For == 'filter':
            filter_data = request.get_json().get('filter_element')            
            Submited_Data = list(Admin_DB.find({},{"employee_data" : {"image" : 0}}))
            filterd = []
            if filter_data == 'None':
                result = Submited_Data
            else:
                for x in Submited_Data:
                    if filter_data == x['status']:
                        filterd.append(x)                
                result = filterd
            return json.loads(dumps(result))
        
        if For == "search":
            Search_Ele = request.get_json().get('search_element')
            Submited_Data = list(Admin_DB.find({},{"employee_data" : {"image" : 0}}))
            searched = []
            for x in Submited_Data:
                if Search_Ele.lower() in x['month'].lower() or Search_Ele.lower() in  x['employee_data']['emp_project'].lower() or Search_Ele.lower() in  x['employee_data']['emp_name'].lower() or Search_Ele.lower() in  x['employee_data']['emp_id'].lower():
                    searched.append(x)
            return json.loads(dumps(searched))



@app.route('/tsa_view_timesheet', methods=['GET','POST'])
def tsa_view_timesheet():   
    if request.method == 'POST':
        Decision = request.get_json().get('Decision')
        data_id = request.get_json().get('data_id')
        Admin_DB.update_one({"_id" : ObjectId(data_id)},{"$set" : {"status" : Decision}})
    return "0"



@app.route('/practice', methods=['GET'])
def practice():   
    if request.method == 'GET':
        Emp = SignUp.find_one({ "emp_id" : "7769"})
        emp_data = json.loads(dumps(Emp))
        return emp_data

if __name__ == "__main__":
    app.run(port = 5000, debug = True) 