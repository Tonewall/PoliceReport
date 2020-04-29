const sprintf = require('sprintf-js').sprintf;

// TODO: add more methods for common query generation

module.exports.showall = function(top_count="TOP 1000", additional_join_statement=null, criteria=null) {
    /* Supports caller defined additional joins and conditionals
        - default join: [Codes-Offense], [tblIncidentOffender]-->TODO: This only accounts for offenders in GTPD RMS
        - format
            - additional join statement: LEFT JOIN [~~] on ()
            - criteria: ( len([OCA Number]) = 8 )
     */
    return sprintf('\
        SELECT distinct %s [OCA Number] as [Incident Number]\n', top_count) +
        '\
            , FORMAT(DATEADD(day, 2, [From Date] + [From Time]),\'yyyy-MM-dd hh:mm tt\') as [From]\
            , FORMAT(DATEADD(day, 2, [To Date] + [To Time]),\'yyyy-MM-dd hh:mm tt\') as [To]\
            , FORMAT(DATEADD(mi, DATEDIFF(mi, (DATEADD(day, 2, [From Date] + [From Time])), (DATEADD(day, 2, [To Date] + [To Time])))/2, DATEADD(day, 2, [From Date] + [From Time])), \'yyyy-MM-dd\') as [Average Day]\
            , [Description] as [Offense]\
            , FORMAT([Report Date], \'yyyy-MM-dd\') as [Report Date]\
            , [Case Status]\
            , [Unit]\
            , [Avg Date]\
            , [Avg Time]\
            , [Avg Day]\
            , CONCAT([St Num], \' \', [Incident Offenses-GTPD+APD].[Street]) as [Location]\
            , [Location Landmark] as [Location Landmark]\
            , CONCAT([FirstName], \' \', [MiddleName], \' \', [LastName]) AS [Offender Name]\
            , [Officer Name]\
            , CASE WHEN LEN([OCA Number]) = 8 THEN \'GTPD\'\
                   WHEN LEN([OCA Number]) != 8 THEN \'APD\'\
              END as [Department]\n\
        FROM [CrimeAnalytics].[dbo].[Incident Offenses-GTPD+APD]\
            LEFT JOIN [CrimeAnalytics].[dbo].[Codes-Offense]\
                ON ([Incident Offenses-GTPD+APD].[Offense] = [Codes-Offense].[NIBRS_Code_Extended])\n\
            LEFT JOIN [CrimeAnalytics].[dbo].[Times]\
                ON ([Incident Offenses-GTPD+APD].[OCA Number] = [Times].[CASE_NUMBER])\n\
            LEFT JOIN [SS_GARecords_Incident].[dbo].[tblIncidentOffender]\
                ON ( [tblIncidentOffender].[IncidentNumber] = [Incident Offenses-GTPD+APD].[OCA Number] )\n'+
            (additional_join_statement==null ? '' : additional_join_statement) + '\n'+
        (criteria==null ? '' : ('WHERE ' + criteria + '\n'))+
        'ORDER BY [From] DESC';
}


module.exports.locations = 
    "SELECT [Building Name],[Loc Type],[St #],[Street-MSAG],[Loc Code] FROM [CrimeAnalytics].[dbo].[Codes_Addresses_Unique]"

module.exports.get_incident_basic = function(incident_number) {
    return sprintf('\
        SELECT [OCA Number]\
            , [Case Disposition]\
            , [Unit]\
            , [Officer Name]\
            , [Report Date]\
            , [From Date]\
            , [From Time]\
            , [To Date]\
            , [To Time]\
            , [Avg Date]\
            , [Avg Time]\
            , [DTEdit]\
            , [Shift]\
            , [Video]\
            , [VClear]\
            , [LType]\
            , [Location Code]\
            , [Patrol Zone]\
            , [Location Landmark]\
            , [Address]\
            , [Intersection]\
            , [Apt-Rm-Ste]\
            , [Alcohol]\
            , [Drug]\
            , [Weapon]\
            , [Offense]\
            , [NIBRSOffense]\
            , [Premises]\
            , [Offn From]\
            , [UCR Changed]\
            , [PType]\
            , [UCInc+]\
            , [CSR]\
            , [Clery]\
            , [Clery+]\
            , [CSArr]\
            , [8399]\
            , [CSRef]\
            , [CSDVS]\
            , [GTtype]\
            , [GTstatus]\
            , [EMS]\
            , [Injured]\
            , [Suicide]\
            , [1013]\
            , [RO]\n\
        FROM [CrimeAnalytics].[dbo].[Incident Offenses-GTPD+APD] left join [CrimeAnalytics].[dbo].[Times] on ([Incident Offenses-GTPD+APD].[OCA Number] = [Times].[CASE_NUMBER])\n\
        WHERE ([OCA Number]=\'%\s\')\
    ', incident_number)
}

module.exports.get_MO = function(incident_number) {
    return sprintf('\
        SELECT [SequenceNumber]\
            , [MO]\n\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentMO]\n\
        WHERE ([IncidentNumber]=\'%s\')\n\
        ORDER BY [SequenceNumber] ASC\
        ', incident_number)
}

module.exports.get_offense_description = function(incident_number) {
    return sprintf('\
        SELECT [SequenceNumber]\
            , [OffenseCode]\
            , [AttemptComplete]\
            , [OffenseDescription]\
            , [Counts]\
            , [Statute]\
            , [OffenseType]     /* Felony or Misdemeanor */\n\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentOffense]\n\
        WHERE ([IncidentNumber]=\'%s\')\n\
        ORDER BY [SequenceNumber] ASC\
    ', incident_number)
}
module.exports.get_personnel_data = function(incident_number) {
    return sprintf('\
    SELECT [ReportingOfficerName]\
        ,[OtherZone]\
        ,[CaseStatus]\
        FROM [SS_GARecords_Incident].[dbo].[tblIncident]\
        WHERE ([IncidentNumber]=\'%s\')\
    ', incident_number)
}
module.exports.get_location_data = function(incident_number) {
    return sprintf('\
    SELECT [LocationLandmark]\
        ,[Location]\
        ,[LocationStreetNumber]\
        ,[LocationStreet]\
        ,[PatrolZone]\
        ,[LocationCode]\
        FROM [SS_GARecords_Incident].[dbo].[tblIncident]\
        WHERE ([IncidentNumber]=\'%s\')\
    ', incident_number)
}

module.exports.get_weapon_data = function(incident_number) {
    return sprintf('\
    SELECT [Weapon]\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentOffenseWeapon]\
        WHERE ([IncidentNumber]=\'%s\')\
    ', incident_number)
}

module.exports.get_premise_data = function(incident_number) {
    return sprintf('\
    SELECT [PremisesEntered]\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentOffense]\
        WHERE ([IncidentNumber]=\'%s\')\
    ', incident_number)
}
module.exports.get_drug_data = function(incident_number) {
    return sprintf('\
    SELECT [DrugRelated]\
        ,[IncidentNumber]\
        FROM [SS_GARecords_Incident].[dbo].[tblIncident]\
        WHERE ([IncidentNumber]=\'%s\')\
    ', incident_number)
}
module.exports.get_location_type = function(incident_number) {
    return sprintf('\
    SELECT [Location]\
        ,[IncidentNumber]\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentOffense]\
        WHERE ([IncidentNumber]=\'%s\')\
    ', incident_number)
}



module.exports.get_narrative_APD = function(incident_number) {
    return sprintf('\
        SELECT *\n\
        FROM [CrimeAnalytics].[dbo].[APD Narratives]\n\
        WHERE ([offense_id]=\'%s\')\n\
    ', incident_number)
}

module.exports.get_narrative_GTPD = function(incident_number) {
    return sprintf('\
        SELECT [Narrative]\n\
        FROM [SS_GARecords_Incident].[dbo].[tblIncident]\n\
        WHERE ([IncidentNumber]=\'%s\')\n\
    ', incident_number)
}

module.exports.get_supplements = function(incident_number) {
    return sprintf('\
        SELECT [SequenceNumber]\
            , [DateEntered]\
            , [OfficerName]\
            , [Narrative] as Text\n\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentSupplement]\n\
        WHERE ([IncidentNumber]=\'%s\' and [Narrative] is not null)\n\
        ORDER BY [SequenceNumber] ASC\
    ', incident_number)
}

module.exports.get_offender_info = function(incident_number) {
    return sprintf('\
        SELECT [SequenceNumber]\
            , CONCAT([LastName], \', \', [FirstName], \' \', [MiddleName]) AS OffenderName\
            , [Race]\
            , [Sex]\
            , [DateOfBirth]\
            , [Age]\
            , [Juvenile]\
            , [Wanted]\
            , [DriverLicenseNumber]\
            , [Height]\
            , [Weight]\
            , [HairColor]\
            , [HomeAddress]\
            , [HomeCity]\
            , [Warrant]\
            , [Arrest]\
            , [SSN]\
            , [Occupation]\
            , [Employer]\n\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentOffender]\n\
        WHERE ([IncidentNumber]=\'%s\')\n\
        ORDER BY [SequenceNumber] ASC\
    ', incident_number)
}

module.exports.get_arrest_info = function(incident_number) {
    return sprintf('\
        SELECT [SequenceNumber]\
            , CONCAT([LastName], \', \', [FirstName], \' \', [MiddleName]) AS OffenderName\
            , [Race]\
            , [Sex]\
            , [ArrestAddress]\
            , [ArrestDate]\
            , [ArrestTime]\
            , [DateOfBirth]\
            , [Age]\
            , [Height]\
            , [Weight]\
            , [HomeAddress]\
            , [HomeCity]\
            , [ArrestingOfficerName] AS ArrestOfficer\
            , [DateOfOffense] AS OffenseDate\
            , [Juvenile]\
            , [HairColor]\
            , [DriverLicenseNumber]\
            , [SSN]\
            , [DrugUse]\
            , [Occupation]\
            , [Employer]\n\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentArrest]\n\
        WHERE ([IncidentNumber]=\'%s\')\n\
        ORDER BY [SequenceNumber] ASC\
    ', incident_number)
}

module.exports.get_property = function(incident_number) {
    return sprintf('\
        SELECT [SequenceNumber]\
            , [Description] AS PropertyType\
            , [Status]\
            , [ItemDescription]\
            , [Make]\
            , [Model]\
            , [VehicleYear]\
            , [VehicleType]\
            , [VehicleStyle]\
            , [LicensePlateState]\
            , [LicensePlateNumber]\
            , [ItemValue]\
            , [Recovered]\
            , [ObtainedAddress]\
            , [ObtainedCity]\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentProperty] left join [SS_GARecords_Config].[dbo].[tblLkpIBRProperty] \
                on ([tblIncidentProperty].[TypeCode] = [tblLkpIBRProperty].[Code])\n\
        WHERE ([IncidentNumber]=\'%s\')\n\
        ORDER BY [SequenceNumber] ASC\
    ', incident_number)
}

module.exports.getOfficers = 
    "SELECT [FirstName],\
        [LastName],\
        [Officer],\
        [IDNumber]\
    FROM [SS_GARecords_Config].[dbo].[tblUser]\
    WHERE [FirstName] not like 'NULL'\
    AND [IDNumber] not like 'NULL'\
    AND [Officer] = '1'\
    ORDER BY [LastName]"

module.exports.crimeTypes = 
"SELECT DISTINCT [NIBRS_Code],[Description],[NIBRS_Category],[NIBRS_Code_Extended] FROM [CrimeAnalytics].[dbo].[Codes-Offense]"
module.exports.crimeCategories = 
"SELECT DISTINCT [NIBRS_Category], [CrimeAnalytics].[dbo].[aggregate_by_comma]( [NIBRS_Category] ) AS [Aggregated_NIBRS_Code_Extended]\
    FROM [CrimeAnalytics].[dbo].[Codes-Offense]"
 
 /* Function definitions in sql (just for reference)
        CREATE FUNCTION dbo.aggregate_by_comma ( @c NVARCHAR(55) )
        RETURNS VARCHAR(MAX) AS BEGIN
        DECLARE @p VARCHAR(MAX) ;
            SET @p = '' ;
            SELECT @p = @p + (CASE WHEN [NIBRS_Offense_Extended] is not null THEN [NIBRS_Offense_Extended] ELSE '' END) + ','
            FROM [CrimeAnalytics].[dbo].[Codes-Offense]
            WHERE [NIBRS_Category] = @c ;
        RETURN @p
        END
*/
 
module.exports.getBothCount = function(body) {

    //OFFICER NAME
    officerName = (body.officerName ? body.officerName : '')

    //ADDRESS
    address = (body.streetName ? body.streetName : '')

    //DEPARTMENT
    department = "LIKE '%%'"
    if(body.selectedDepartment) {
        if(body.selectedDepartment.value === 'gtpDepartment') {
            department = "NOT LIKE'APD'"
        } else if(body.selectedDepartment.value === 'apDepartment') {
            department = "LIKE'APD'"
        } 
    }

    // //LOCATION
    // if(body.selectedDepartment && body.selectedDepartment.value != "bothDepartment") {
    //     //department chosen
    //     if(body.selectedDepartment.value === 'gtpDepartment') {

    //     } else if(body.selectedDepartment.value === 'apDepartment') {

    //     } 
    // } else {
    //     //no department chosen

    // }

    //SHIFTS AND TEAMS
    if(body.selectedShift) {
        unit = "AND ([Unit] LIKE '" + body.selectedShift[0].label + "'"
        for(var i = 1; i < body.selectedShift.length; i++) {
            unit += " OR [Unit] LIKE '" + body.selectedShift[i].label + "'"
        }
        unit += ")" 
    } else {
        unit = ''
    }

    //CRIMES AND CATEGORIES
    if(body.selectedCrimeType) {
        crime = "AND ([Offense] LIKE '" + body.selectedCrimeType[0]['NIBRS_Code_Extended'] + "'"
        for(var i = 1; i < body.selectedCrimeType.length; i++) {
            crime += " OR [Offense] LIKE '" + body.selectedCrimeType[i]['NIBRS_Code_Extended'] + "'"
        }
        crime += ")"
    } else if (body.selectedCrimeCategory && body.selectedCrimeCategory.value !== "Any") {
        crime = "AND [NIBRS_Category] LIKE '" + body.selectedCrimeCategory.value + "'"
    } else {
        crime = ''
    }

    
    return sprintf(
        "SELECT MONTH([Report Date]) as [Month], COUNT(*) as [COUNT]\
        FROM [CrimeAnalytics].[dbo].[Incident Offenses-GTPD+APD]\
        FULL OUTER JOIN [CrimeAnalytics].[dbo].[Codes-Offense] ON [Incident Offenses-GTPD+APD].[Offense] = [Codes-Offense].[NIBRS_Code_Extended]\
        WHERE YEAR([Report Date]) =\'%d'\n\
        AND [Officer Name] LIKE \'%%%s%%'\n\
        AND [Address] LIKE \'%%%s%%'\n\
        AND [Location Code] \%s\n\
        \%s\n\
        \%s\n\
        GROUP BY MONTH([Report Date])\
        ORDER BY MONTH([Report Date])"
        ,body.selectedYear.value, officerName, address, department, unit, crime
    )
}
module.exports.getTimeCount = function(body) {
    //OFFICER NAME
    officerName = (body.officerName ? body.officerName : '')

    //ADDRESS
    address = (body.streetName ? body.streetName : '')

    //DEPARTMENT
    department = "LIKE '%%'"
    if(body.selectedDepartment) {
        if(body.selectedDepartment.value === 'gtpDepartment') {
            department = "NOT LIKE'APD'"
        } else if(body.selectedDepartment.value === 'apDepartment') {
            department = "LIKE'APD'"
        } 
    }

    // //LOCATION
    // if(body.selectedDepartment && body.selectedDepartment.value != "bothDepartment") {
    //     //department chosen
    //     if(body.selectedDepartment.value === 'gtpDepartment') {

    //     } else if(body.selectedDepartment.value === 'apDepartment') {

    //     } 
    // } else {
    //     //no department chosen

    // }

    //SHIFTS AND TEAMS
    if(body.selectedShift) {
        unit = "AND ([Unit] LIKE '" + body.selectedShift[0].label + "'"
        for(var i = 1; i < body.selectedShift.length; i++) {
            unit += " OR [Unit] LIKE '" + body.selectedShift[i].label + "'"
        }
        unit += ")" 
    } else {
        unit = ''
    }


    //CRIMES AND CATEGORIES
    if(body.selectedCrimeType) {
        crime = "AND ([Offense] LIKE '" + body.selectedCrimeType[0]['NIBRS_Code_Extended'] + "'"
        for(var i = 1; i < body.selectedCrimeType.length; i++) {
            crime += " OR [Offense] LIKE '" + body.selectedCrimeType[i]['NIBRS_Code_Extended'] + "'"
        }
        crime += ")"
    } else if (body.selectedCrimeCategory && body.selectedCrimeCategory.value !== "Any") {
        crime = "AND [NIBRS_Category] LIKE '" + body.selectedCrimeCategory.value + "'"
    } else {
        crime = ''
    }
    return sprintf(
        "SELECT datepart(hour, DATEADD(HOUR,  DATEDIFF(HOUR, (CAST([From Date] as DATETIME) + CAST([From Time] as DATETIME)), (CAST([To Date] as DATETIME) + CAST([To Time] as DATETIME)))/2, CAST([From Date] as DATETIME) + CAST([From Time] as DATETIME))) as [Hour], \
        COUNT(*) AS [Count]\
        FROM [CrimeAnalytics].[dbo].[Incident Offenses-GTPD+APD]\
        FULL OUTER JOIN [CrimeAnalytics].[dbo].[Codes-Offense] ON [Incident Offenses-GTPD+APD].[Offense] = [Codes-Offense].[NIBRS_Code_Extended]\
        WHERE YEAR([Report Date]) =\'%d'\n\
        AND [Officer Name] LIKE \'%%%s%%'\n\
        AND [Address] LIKE \'%%%s%%'\n\
        AND [Location Code] \%s\n\
        AND DATEDIFF(HOUR, (CAST([From Date] as DATETIME) + CAST([From Time] as DATETIME)), (CAST([To Date] as DATETIME) + CAST([To Time] as DATETIME))) < 4\
        \%s\n\
        \%s\n\
		GROUP BY (datepart(hour, DATEADD(HOUR,  DATEDIFF(HOUR, (CAST([From Date] as DATETIME) + CAST([From Time] as DATETIME)), (CAST([To Date] as DATETIME) + CAST([To Time] as DATETIME)))/2, CAST([From Date] as DATETIME) + CAST([From Time] as DATETIME))))\
		ORDER BY (datepart(hour, DATEADD(HOUR,  DATEDIFF(HOUR, (CAST([From Date] as DATETIME) + CAST([From Time] as DATETIME)), (CAST([To Date] as DATETIME) + CAST([To Time] as DATETIME)))/2, CAST([From Date] as DATETIME) + CAST([From Time] as DATETIME))))"
        ,body.selectedYear.value, officerName, address, department, unit, crime
    )
}

module.exports.getLocationRanking = function(body) {
    return sprintf(
        "SELECT [Building Name],\
        COUNT(*) as [PART I],\
        sum(case when [NIBRS_Category] = 'Robbery' then 1 else 0 end) AS [Robbery],\
        sum(case when [NIBRS_Category] = 'Larceny' then 1 else 0 end) AS [Larceny],\
        sum(case when [NIBRS_Category] = 'Assault' then 1 else 0 end) AS [Assault],\
        sum(case when [NIBRS_Category] = 'Burglary' then 1 else 0 end) AS [Burglary],\
        sum(case when [NIBRS_Category] = 'Arson' then 1 else 0 end) AS [Arson],\
        sum(case when [NIBRS_Category] = 'Homicide' then 1 else 0 end) AS [Homicide],\
        sum(case when [NIBRS_Category] = 'Sex Offenses' then 1 else 0 end) AS [Sex Offenses],\
        sum(case when [NIBRS_Category] = 'Motor Vehicle Theft' then 1 else 0 end) AS [Motor Vehicle Theft],\
        sum(case when [NIBRS_Code_Extended] = 'T-Bike' then 1 else 0 end) AS [Bicycle Theft]\
        FROM [CrimeAnalytics].[dbo].[Incident Offenses-GTPD+APD]\
        JOIN [CrimeAnalytics].[dbo].[Codes-Offense] ON [Codes-Offense].[NIBRS_Code_Extended] = [Incident Offenses-GTPD+APD].[Offense]\
        JOIN [CrimeAnalytics].[dbo].[Codes_Addresses_Unique] ON (CAST([Codes_Addresses_Unique].[St #] as nvarchar(255)) = [Incident Offenses-GTPD+APD].[St Num]\
            AND [Codes_Addresses_Unique].[Street Name] = [Incident Offenses-GTPD+APD].[Street Name])\
        WHERE [Report Date] >= '%s'\n\
        AND [Report Date] <= '%s'\n\
        AND [NIBRS_Category] in ('Robbery', 'Larceny', 'Assault', 'Burglary', 'Motor Vehicle Theft', 'Arson', 'Homicide', 'Sex Offenses')\
        AND [Loc Code] NOT LIKE 'APD'\
        GROUP BY [Building Name]\
        ORDER BY COUNT(*) DESC"
        ,body.startDate, body.endDate
    )
}

module.exports.getYears = "SELECT DISTINCT YEAR([Report Date]) as [YEAR]\
        FROM [CrimeAnalytics].[dbo].[Incident Offenses-GTPD+APD]\
        ORDER BY YEAR([Report Date]) DESC"


module.exports.getBuildings = "SELECT [Address]\
    ,[Building Name]\
    ,[Max Bldg #] as [Bldg #]\
    ,[Loc Code] as [Location Code]\
    ,[Loc Type] as [Location Type]\
    ,[Patrol Zone]\
    ,[Maintenance Zone] as [Area]\
    FROM [CrimeAnalytics].[dbo].[Codes_Addresses_Unique]\
    WHERE [Loc Code] not like '%APD%'\
    ORDER BY [Building Name]"


/* Queries for filters */
module.exports.filter = function(criteria) {

    criteria_script = ''
    additional_join_statement = ''

    codes_address_unique_join = false

    
    /* Location Filter
        - Priority: Street Name -> Buildings -> Loc Type
     */
    if(criteria.streetName != null) // Street Name
    {
        criteria_script += '('
        criteria_script += sprintf('[Incident Offenses-GTPD+APD].[Street Name] like \'%%%s%%\'', criteria.streetName)
        criteria_script += (criteria.selectedDepartment.value == 'bothDepartment') ? '' :
                (criteria.selectedDepartment.value == 'gtpDepartment') ? ' AND LEN([OCA Number]) = 8' :
                                                                         ' AND LEN([OCA Number]) = 9'
        criteria_script += ')'
    }
    
    // This maybe inefficient, but can reuse code
    else
    {
        gtpd_criteria_script = ''
        apd_criteria_script = ''

        // Make GTPD part
        if(criteria.selectedBuilding != null && criteria.selectedBuilding.length > 0)   // GTPD-Building
        {
            building_list_script = ''
            criteria.selectedBuilding.forEach((item)=>{ building_list_script += ('\'' + item['Building Name'] + '\'' + ',') })
            building_list_script = building_list_script.substring(0, building_list_script.length-1)
            gtpd_criteria_script = '([Location Landmark] in (' + building_list_script + ') AND LEN([OCA Number]) = 8)'
        }
        else if(criteria.selectedGTLocationType.value == 'Any') // GTPD-Any loc type : all GTPD buildings
        {
            gtpd_criteria_script = '(LEN([OCA Number]) = 8)'
        }
        else    // GTPD-Loc Type(Specific)
        {
            codes_address_unique_join = true
            gtpd_criteria_script = '([Loc Type] = \'' + criteria.selectedGTLocationType.value + '\' AND LEN([OCA Number]) = 8)'
        }

        // Make APD part
        if(criteria.selectedAPDBuilding != null && criteria.selectedAPDBuilding.length > 0)   // APD-Building
        {
            building_list_script = ''
            criteria.selectedAPDBuilding.forEach((item)=>{ building_list_script += ('\'' + item['Building Name'] + '\'' + ',') })
            building_list_script = building_list_script.substring(0, building_list_script.length-1)
            apd_criteria_script = '([Location Landmark] in (' + building_list_script + ') AND LEN([OCA Number]) = 9)'
        }
        else if(criteria.selectedAPDLocationType.value == 'Any') // APD-Any loc type : all APD buildings
        {
            apd_criteria_script = '(LEN([OCA Number]) = 9)'
        }
        else    // APD-Loc Type(Specific)
        {
            codes_address_unique_join = true
            apd_criteria_script = '([Loc Type] = \'' + criteria.selectedAPDLocationType.value + '\' AND LEN([OCA Number]) = 9)'
        }

        // Integrate into one according to the department state
        if(criteria.selectedDepartment.value == 'bothDepartment')   // Both departments
        {
            criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ') + '(' + gtpd_criteria_script + ' OR ' + apd_criteria_script + ')'
        }
        else if(criteria.selectedDepartment.value == 'gtpDepartment')   // GTPD department
        {
            criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ') + gtpd_criteria_script
        }
        else    // APD department
        {
            criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ') + apd_criteria_script
        }
    }
    // DATEDIFF(HOUR, (DATEADD(day, 2, [From Date] + [From Time])), (DATEADD(day, 2, [To Date] + [To Time]))) > 16\
    //                 THEN \'Unknown or -\'\
    //             WHEN DATEDIFF(HOUR, (DATEADD(day, 2, [From Date] + [From Time])), (DATEADD(day, 2, [To Date] + [To Time]))) <= 16\
    //                 THEN FORMAT(DATEADD(mi, DATEDIFF(mi, (DATEADD(day, 2, [From Date] + [From Time])), (DATEADD(day, 2, [To Date] + [To Time])))/2, DATEADD(day, 2, [From Date] + [From Time])), \'hh:mm tt\')\
    //             End as [Average Time]\
    /* Date Filter */
    // criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ') 
    //         + '(' + '[Report Date] >= \'' + criteria.startDate + '\' AND [Report Date] <= \'' + criteria.endDate + '\')'
    // dateTimeOptionScript +='((' + '[Avg Time] >= \'' + criteria.fromTime + '\' AND [Avg Time] <= \'' + criteria.toTime + '\') OR (' + '[From Time] >= \'' + criteria.fromTime + '\' AND [To Time] <= \'' + criteria.toTime + '\'))'

    //need to get from avg, from, and to datetime in the database
    var dateTimeOptionScript = ''
    if(criteria.dateTimeOption === 'avg' || criteria.dateTimeOption === null) {
        dateTimeOptionScript = '((' + '[Avg Date] >= \'' + criteria.startDate + '\' AND [Avg Date] <= \'' + criteria.endDate + '\') OR (' + '[From Date] >= \'' + criteria.startDate + '\' AND [To Date] <= \'' + criteria.endDate + '\'))'
        if(criteria.selectedCustomTime) {
            dateTimeOptionScript +='AND ((' + '[Avg Time] >= \'1899-12-30 ' + criteria.fromTime + '\' AND [Avg Time] <= \'1899-12-30 ' + criteria.toTime + '\') OR (' + '[From Time] >= \'1899-12-30 ' + criteria.fromTime + '\' AND [To Time] <= \'1899-12-30 ' + criteria.toTime + '\'))'
        }
        
    } else if(criteria.dateTimeOption === 'from') {
        
    } else if(criteria.dateTimeOption === 'to') {

    } else if(criteria.dateTimeOption === 'report') {

    }
    criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ') + dateTimeOptionScript


    /* Crime Filter */
    if(criteria.selectedCrimeType)  // Crime type
    {
        crime_type_list_script = ''
        criteria.selectedCrimeType.forEach((item)=>{ crime_type_list_script += ('\'' + item['NIBRS_Code_Extended'] + '\'' + ',') })
        crime_type_list_script = crime_type_list_script.substring(0, crime_type_list_script.length-1)
        criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ')+ '([Codes-Offense].[NIBRS_Code_Extended] in (' + crime_type_list_script + ') )'}
    else    // Crime Category
    {
        if(criteria.selectedCrimeCategory.label != 'Any')   // Non-'Any' category
        {
            if(criteria.selectedCrimeCategory.label == 'All Other Offenses')    // 'All Other Offenses' category
            {
                criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ')
                        + '([Codes-Offense].[NIBRS_Category] is null OR [Codes-Offense].[NIBRS_Category] = \'' + criteria.selectedCrimeCategory.label + '\' )'
            }
            else
            {
                criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ') + '([Codes-Offense].[NIBRS_Category] = \'' + criteria.selectedCrimeCategory.label + '\' )'
            }
        }
    }

    if(criteria.selectedArrest) // Arrests/CT Warnings
    {
        
    }
    if(criteria.selectedOutcome)    // Felony/Misdemeanor
    {

    }
    if(criteria.selectedCaseStatus) {
        if(criteria.selectedCaseStatus.value !== "Any") {
            criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ')
                + '[Case Status] = \'' + criteria.selectedCaseStatus.value + '\''
        }
    }

    /* Personnel Filter 
        - Priority: Officer Name -> Teams/Shifts
     */
    if(criteria.officerName)    // Officer Name
    {
        criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ') + '([Incident Offenses-GTPD+APD].[Officer Name] like \'%'
                            + criteria.officerName + '%\') '
    }
    else    // Teams/Shifts
    {
        if(criteria.selectedShift)  // Not 'Any'
        {
            shift_list_script = ''
            criteria.selectedShift.forEach((item)=>{ shift_list_script += ('\'' + item.label + '\'' + ',') })
            shift_list_script = shift_list_script.substring(0, shift_list_script.length-1)
            criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ')+ '([Unit] in (' + shift_list_script + ') )'
        }
    }

    top_count = ''
    if(criteria.selectedCount != 'All') {
        top_count = "TOP " + criteria.selectedCount
    }

    
    if(codes_address_unique_join)
        additional_join_statement += 
            'LEFT JOIN [CrimeAnalytics].[dbo].[Codes_Addresses_Unique] ON (CAST([Codes_Addresses_Unique].[St #] as nvarchar(255)) = [Incident Offenses-GTPD+APD].[St Num]\
                AND [Codes_Addresses_Unique].[Street Name] = [Incident Offenses-GTPD+APD].[Street Name]) '

    return this.showall(top_count = top_count, additional_join_statement = additional_join_statement.length==0 ? null : additional_join_statement, 
                        criteria = criteria_script.length==0 ? null : criteria_script)
}