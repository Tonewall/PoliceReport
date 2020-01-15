const sprintf = require('sprintf-js').sprintf;

// TODO: add more methods for common query generation

module.exports.showall = function(additional_join_statement=null, criteria=null, num_incidents=1000) {
    /* Supports caller defined additional joins and conditionals
        - default join: [Codes-Offense], [tblIncidentOffender]
        - format
            - additional join statement: LEFT JOIN [~~] on ()
            - criteria: ( len([OCA Number]) = 8 )
     */
    return sprintf('\
        SELECT distinct top (%d) [OCA Number] as [Incident Number]\n', num_incidents) +
        '\
            , CONVERT(varchar, [Report Date], 23) as [Report Date]\
            , convert(varchar, [From Time], 8) as [Time]\
            , CASE  WHEN [Incident Offenses-GTPD+APD].[SRSOffense] is not null AND LEN([Incident Offenses-GTPD+APD].[SRSOffense]) = 3 THEN [NIBRS_Category]\
                    WHEN [Incident Offenses-GTPD+APD].[SRSOffense] is not null AND LEN([Incident Offenses-GTPD+APD].[SRSOffense]) != 3 THEN [Inc_Desc_PCase]\
                    WHEN [Incident Offenses-GTPD+APD].[SRSOffense] is null AND [Incident Offenses-GTPD+APD].[NIBRSOffense] is not null THEN [NIBRS_Category]\
                    WHEN [Incident Offenses-GTPD+APD].[SRSOffense] is null AND [Incident Offenses-GTPD+APD].[NIBRSOffense] is null AND LEN([Incident Offenses-GTPD+APD].[Offense]) = 3 THEN [NIBRS_Category]\
                    WHEN [Incident Offenses-GTPD+APD].[SRSOffense] is null AND [Incident Offenses-GTPD+APD].[NIBRSOffense] is null AND LEN([Incident Offenses-GTPD+APD].[Offense]) != 3 THEN [Inc_Desc_PCase]\
              END as [Description]\
            , CONCAT([St Num], \' \', [Incident Offenses-GTPD+APD].[Street]) as [Street]\
            , [Location Landmark] as [Location Name]\
            , CONCAT([FirstName], \' \', [MiddleName], \' \', [LastName]) AS [Offender Name]\
            , [Officer Name]\
            , CASE WHEN LEN([OCA Number]) = 8 THEN \'GTPD\'\
                   WHEN LEN([OCA Number]) != 8 THEN \'APD\'\
              END as [Department]\n\
        FROM [CrimeAnalytics].[dbo].[Incident Offenses-GTPD+APD]\
            LEFT JOIN [CrimeAnalytics].[dbo].[Codes-Offense]\
                ON ( ([Incident Offenses-GTPD+APD].[SRSOffense] is not null AND LEN([Incident Offenses-GTPD+APD].[SRSOffense]) = 3 AND [Incident Offenses-GTPD+APD].[SRSOffense] = [Codes-Offense].[NIBRS_Offense_code] AND [Codes-Offense].[NIBRS_Category] is not null)\
                    OR ([Incident Offenses-GTPD+APD].[SRSOffense] is not null AND LEN([Incident Offenses-GTPD+APD].[SRSOffense]) != 3 AND [Incident Offenses-GTPD+APD].[SRSOffense] = [Codes-Offense].[UCR_CODE1])\
                    OR ([Incident Offenses-GTPD+APD].[SRSOffense] is null AND [Incident Offenses-GTPD+APD].[NIBRSOffense] is not null AND [Incident Offenses-GTPD+APD].[NIBRSOffense] = [Codes-Offense].[NIBRS_Offense_code] AND [Codes-Offense].[NIBRS_Category] is not null)\
                    OR ([Incident Offenses-GTPD+APD].[SRSOffense] is null AND [Incident Offenses-GTPD+APD].[NIBRSOffense] is null AND LEN([Incident Offenses-GTPD+APD].[Offense]) = 3 AND [Incident Offenses-GTPD+APD].[Offense] = [Codes-Offense].[NIBRS_Offense_code] AND [Codes-Offense].[NIBRS_Category] is not null)\
                    OR ([Incident Offenses-GTPD+APD].[SRSOffense] is null AND [Incident Offenses-GTPD+APD].[NIBRSOffense] is null AND LEN([Incident Offenses-GTPD+APD].[Offense]) != 3 AND [Incident Offenses-GTPD+APD].[Offense] = [Codes-Offense].[UCR_CODE1]))\n\
            LEFT JOIN [SS_GARecords_Incident].[dbo].[tblIncidentOffender]\
                ON ( [tblIncidentOffender].[IncidentNumber] = [Incident Offenses-GTPD+APD].[OCA Number] )\n'+
            (additional_join_statement==null ? '' : additional_join_statement) + '\n'+
        (criteria==null ? '' : ('WHERE ' + criteria + '\n'))+
        'ORDER BY [Report Date] DESC, [Time] DESC';
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

module.exports.get_narrative_APD = function(incident_number) {
    return sprintf('\
        SELECT *\n\
        FROM [CrimeAnalytics].[dbo].[APD Narratives]\n\
        WHERE ([offense_id]=\'%s\')\n\
    ', incident_number)
}

module.exports.get_narrative = function(incident_number) {
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
            , [Property Data Value] AS PropertyType\
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
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentProperty] left join [CrimeAnalytics].[dbo].[Codes-NIBRS DE 15 Property Description] \
                on ([tblIncidentProperty].[TypeCode] = [Codes-NIBRS DE 15 Property Description].[Property Code])\n\
        WHERE ([IncidentNumber]=\'%s\')\n\
        ORDER BY [SequenceNumber] ASC\
    ', incident_number)
}

module.exports.crimeTypes = 
"SELECT DISTINCT [UCR_Code1],[Inc_Desc_PCase],[NIBRS_Category],[NIBRS_Offense_code] FROM [CrimeAnalytics].[dbo].[Codes-Offense]"
module.exports.crimeCategories = 
"SELECT DISTINCT [NIBRS_Category], (CASE WHEN [NIBRS_Category] is not null THEN [CrimeAnalytics].[dbo].[aggregate_by_comma]( [NIBRS_Category] )\
										 WHEN [NIBRS_Category] is null THEN [CrimeAnalytics].[dbo].[aggregate_by_comma_null]() END)\
								  AS NIBRS_Offense_code\
    FROM [CrimeAnalytics].[dbo].[Codes-Offense]"
 
 /* Function definitions in sql (just for reference)
        CREATE FUNCTION dbo.aggregate_by_comma ( @c NVARCHAR(55) )
        RETURNS VARCHAR(MAX) AS BEGIN
        DECLARE @p VARCHAR(MAX) ;
            SET @p = '' ;
            SELECT @p = @p + (CASE WHEN [NIBRS_Offense_code] is not null THEN [NIBRS_Offense_code] ELSE '' END) + ','
            FROM [CrimeAnalytics].[dbo].[Codes-Offense]
            WHERE [NIBRS_Category] = @c ;
        RETURN @p
        END

        CREATE FUNCTION dbo.aggregate_by_comma_null ()
        RETURNS VARCHAR(MAX) AS BEGIN
        DECLARE @p VARCHAR(MAX) ;
            SET @p = '' ;
            SELECT @p = @p + (CASE WHEN [NIBRS_Offense_code] is not null THEN [NIBRS_Offense_code] ELSE '' END) + ','
            FROM [CrimeAnalytics].[dbo].[Codes-Offense]
            WHERE [NIBRS_Category] is null ;
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
        crime = "AND ([SRSOffense] LIKE '" + body.selectedCrimeType[0]['UCR_Code1'] + "'"
        for(var i = 1; i < body.selectedCrimeType.length; i++) {
            crime += " OR [SRSOffense] LIKE '" + body.selectedCrimeType[i]['UCR_Code1'] + "'"
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
        FULL OUTER JOIN [CrimeAnalytics].[dbo].[Codes-Offense] ON [Incident Offenses-GTPD+APD].[SRSOffense] = [Codes-Offense].[UCR_CODE1]\
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
        crime = "AND ([SRSOffense] LIKE '" + body.selectedCrimeType[0]['UCR_Code1'] + "'"
        for(var i = 1; i < body.selectedCrimeType.length; i++) {
            crime += " OR [SRSOffense] LIKE '" + body.selectedCrimeType[i]['UCR_Code1'] + "'"
        }
        crime += ")"
    } else if (body.selectedCrimeCategory && body.selectedCrimeCategory.value !== "Any") {
        crime = "AND [NIBRS_Category] LIKE '" + body.selectedCrimeCategory.value + "'"
    } else {
        crime = ''
    }
    return sprintf(
        "SELECT DATEPART(HOUR, [From Time]) as [Hour], COUNT(*) AS [Count]\
        FROM [CrimeAnalytics].[dbo].[Incident Offenses-GTPD+APD]\
        FULL OUTER JOIN [CrimeAnalytics].[dbo].[Codes-Offense] ON [Incident Offenses-GTPD+APD].[SRSOffense] = [Codes-Offense].[UCR_CODE1]\
        WHERE YEAR([Report Date]) =\'%d'\n\
        AND [Officer Name] LIKE \'%%%s%%'\n\
        AND [Address] LIKE \'%%%s%%'\n\
        AND [Location Code] \%s\n\
        \%s\n\
        \%s\n\
		GROUP BY DATEPART(HOUR, [From Time])\
		ORDER BY DATEPART(HOUR, [From Time])"
        ,body.selectedYear.value, officerName, address, department, unit, crime
    )
}

module.exports.getLocationRanking = function(body) {
    return sprintf(
        "SELECT [Building Name],\
        COUNT(*) as [PART I],\
        sum(case when [NIBRS_Category] = 'Robbery' then 1 else 0 end) AS [Robbery],\
        sum(case when [NIBRS_Category] = 'Larceny/Theft Offenses' then 1 else 0 end) AS [Larceny/Theft Offenses],\
        sum(case when [NIBRS_Category] = 'Assault Offenses' then 1 else 0 end) AS [Assault Offenses],\
        sum(case when [NIBRS_Category] = 'Burglary/Breaking & Entering' then 1 else 0 end) AS [Burglary/Breaking & Entering],\
        sum(case when [NIBRS_Category] = 'Motor Vehicle Theft' then 1 else 0 end) AS [Motor Vehicle Theft]\
        FROM [CrimeAnalytics].[dbo].[Incident Offenses-GTPD+APD]\
        JOIN [CrimeAnalytics].[dbo].[Codes-Offense] ON [Codes-Offense].[UCR_CODE1] = [Incident Offenses-GTPD+APD].[SRSOffense]\
        JOIN [CrimeAnalytics].[dbo].[Codes_Addresses_Unique] ON (CAST([Codes_Addresses_Unique].[St #] as nvarchar(255)) = [Incident Offenses-GTPD+APD].[St Num]\
            AND [Codes_Addresses_Unique].[Street Name] = [Incident Offenses-GTPD+APD].[Street Name])\
        WHERE [Report Date] >= '%s'\n\
        AND [Report Date] <= '%s'\n\
        AND [NIBRS_Category] in ('Robbery', 'Larceny/Theft Offenses', 'Assault Offenses', 'Burglary/Breaking & Entering', 'Motor Vehicle Theft')\
        AND [Loc Code] NOT LIKE 'APD'\
        GROUP BY [Building Name]\
        ORDER BY COUNT(*) DESC"
        ,body.startDate, body.endDate
    )
}

module.exports.getYears = "SELECT DISTINCT YEAR([Report Date]) as [YEAR]\
        FROM [CrimeAnalytics].[dbo].[Incident Offenses-GTPD+APD]\
        ORDER BY YEAR([Report Date]) DESC"


/* Queries for filters */
module.exports.filter = function(criteria) {

    console.log(criteria)

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


    /* Crime Filter */
    if(criteria.selectedCrimeType)  // Crime type
    {
        crime_type_list_script = ''
        criteria.selectedCrimeType.forEach((item)=>{ crime_type_list_script += ('\'' + item.label + '\'' + ',') })
        crime_type_list_script = crime_type_list_script.substring(0, crime_type_list_script.length-1)
        criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ')+ '([Codes-Offense].[Inc_Desc_PCase] in (' + crime_type_list_script + ') )'    }
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

    /* Date Filter */
    criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ') 
            + '(' + '[Report Date] >= \'' + criteria.startDate + '\' AND [Report Date] <= \'' + criteria.endDate + '\')'

    if(codes_address_unique_join)
        additional_join_statement += 
            'LEFT JOIN [CrimeAnalytics].[dbo].[Codes_Addresses_Unique] ON (CAST([Codes_Addresses_Unique].[St #] as nvarchar(255)) = [Incident Offenses-GTPD+APD].[St Num]\
                AND [Codes_Addresses_Unique].[Street Name] = [Incident Offenses-GTPD+APD].[Street Name]) '

    return this.showall(additional_join_statement = additional_join_statement.length==0 ? null : additional_join_statement, 
                        criteria = criteria_script.length==0 ? null : criteria_script)
}



/* Address Ranking Query configured

DECLARE @START_DATE Date = '10-10-2010';
DECLARE @END_DATE Date = '10-10-2019';

        , [SequenceNumber]\n\
        , [Offense Code]\n\
        , [AttemptComplete]\n\
        , [OffenseDescription]\n\
        , [Counts]\n\
        FROM [CrimeAnalytics].[dbo].[tblIncidentOffense]\n\


SELECT [Incident Offenses-GTPD+APD].[St Num], [Incident Offenses-GTPD+APD].Street, [Codes-Addresses-Unique].[Building Name], [Codes-Addresses-Unique].[Loc Type], Count([Incident Offenses-GTPD+APD].[OCA Number]) AS [CountOfOCA Number], Min([Incident Offenses-GTPD+APD].[Report Date]) AS [MinOfReport Date], Max([Incident Offenses-GTPD+APD].[Report Date]) AS [MaxOfReport Date]

FROM ([Incident Offenses-GTPD+APD] LEFT JOIN [Codes-Addresses-Unique] ON ([Incident Offenses-GTPD+APD].[St Num] = [Codes-Addresses-Unique].Number) AND ([Incident Offenses-GTPD+APD].Street = [Codes-Addresses-Unique].Street)) LEFT JOIN [Codes-Offense] ON [Incident Offenses-GTPD+APD].SRSOffense = [Codes-Offense].UCR_CODE1


WHERE ((([Incident Offenses-GTPD+APD].[Case Disposition]) Not In ('U','03','NC')) AND (([Codes-Offense].UC2) Between '030' And '070') AND (([Incident Offenses-GTPD+APD].[St Num]) Is Not Null And ([Incident Offenses-GTPD+APD].[St Num])<>'0') AND (([Incident Offenses-GTPD+APD].[Report Date]) Between @START_DATE And @END_DATE) AND (([Incident Offenses-GTPD+APD].[Location Code])<>'APD' Or ([Incident Offenses-GTPD+APD].[Location Code]) Is Null)) OR ((([Incident Offenses-GTPD+APD].[Case Disposition]) Is Null) AND (([Codes-Offense].UC2) Between '030' And '070') AND (([Incident Offenses-GTPD+APD].[St Num]) Is Not Null And ([Incident Offenses-GTPD+APD].[St Num])<>'0') AND (([Incident Offenses-GTPD+APD].[Report Date]) Between @START_DATE And @END_DATE) AND (([Incident Offenses-GTPD+APD].[Location Code])<>'APD' Or ([Incident Offenses-GTPD+APD].[Location Code]) Is Null))


GROUP BY [Incident Offenses-GTPD+APD].[St Num], [Incident Offenses-GTPD+APD].Street, [Codes-Addresses-Unique].[Building Name], [Codes-Addresses-Unique].[Loc Type]

ORDER BY [CountOfOCA Number] DESC;

*/ 