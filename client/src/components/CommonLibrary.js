var incident_keys = [
    'OCA Number', 
    'Report Date', 
    'Offense', 
    'NIBRSOffense', 
    'SRSOffense', 
    'Case Status', 
    'Case Disposition', 
    'VClear', 
    'Video', 
    'Premises', 
    'UCInc+', 
    'Arson', 
    'GT', 
    'GTstatus', 
    'GTtype', 
    'PType', 
    'Location Code', 
    'LType', 
    'Location Landmark', 
    'Address', 
    'St Num', 
    'Street', 
    'Street Name', 
    'Quad', 
    'Intersection', 
    'Int', 
    'Apt-Rm-Ste', 
    'In-Out', 
    'MO', 
    'Patrol Zone', 
    'CC Zone', 
    'From Date', 
    'From Time', 
    'To Date', 
    'To Time', 
    'DTEdit', 
    '8399', 
    'Offenses', 
    'Entered Autos', 
    'Officer Name', 
    'Unit', 
    'Attempt-Complete', 
    'Adult-Juvenile', 
    'CSR', 
    'Clery', 
    'Clery2', 
    'Clery+', 
    'CSArr', 
    'CSRef', 
    'CSDVS', 
    'CSA', 
    'Alert Num', 
    'APDClery', 
    'Offn From', 
    'Disp From', 
    'Location Code From', 
    'UCR Changed', 
    'Clear Date', 
    'Weapon', 
    'Weapon-NIBRS', 
    'Premise Type', 
    'Stranger', 
    'Theft Location', 
    'Recovery Location', 
    'Related OCA', 
    'Shot', 
    'Carjack', 
    'Alcohol', 
    'Drug', 
    'Gang', 
    'Void', 
    'Juv Arr', 
    'Copy', 
    'Greek source', 
    'FIT', 
    'FV', 
    'EMS', 
    'Suicide', 
    '1013', 
    'Injured', 
    'ArrAdd', 
    'RO', 
    'K9', 
    'Longitude', 
    'Latitude', 
    'Exceptional Clearance', 
    'Method of Entry'
]
var incident_columns = new Array(incident_keys.length)
for(var i=0;i<incident_keys.length;i++)
{
    incident_columns[i] = {label: incident_keys[i], field: incident_keys[i], width: 100}
}

module.exports.incident_datatable_feeds = function(data)
{
    data.forEach(element => {
        incident_keys.forEach(key => {
            if(element[key] == null)    element[key]='-'
            else if(element[key] === true) element[key]='true'
            else if(element[key] === false)    element[key]='false'
        });
    });
    
    var incident_rows = new Array(data.length)
    for(var i=0;i<incident_rows.length;i++)
    {
        let temp_arr = new Array(incident_columns.length)
        let j=0
        let aliased_i = i   // Make safe reference
        incident_columns.forEach((key)=>
            {
                temp_arr[j] = data[aliased_i][key['field']]
                j+=1
            })
        incident_rows[i] = temp_arr
    }

    return {'rows': incident_rows, 'columns': incident_columns}
}