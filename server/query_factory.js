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
            , FORMAT(DATEADD(day, 2, [From Date] + [From Time]),\'yyyy-MM-dd hh:mm tt\') as [From]\n\
            , FORMAT(DATEADD(day, 2, [To Date] + [To Time]),\'yyyy-MM-dd hh:mm tt\') as [To]\n\
            , [Codes-Offense].[Description] as [Offense]\n\
            , FORMAT([Report Date], \'yyyy-MM-dd\') as [Report Date]\n\
            , [Case Status]\n\
            , [Times].[Shift2] as [Occurred Shift]\n\
            , [Unit]\n\
            , [ViolationCode] = (SELECT STUFF((SELECT \', \' + [ViolationCode] \n\
                    FROM [SS_GARecords_Citation].[dbo].[tblCitation] \n\
                    WHERE (AgencyCaseNumber = Results.AgencyCaseNumber) \n\
                    FOR XML PATH (\'\')),1,2,\'\') AS ViolationCode\n\
                FROM [SS_GARecords_Citation].[dbo].[tblCitation] Results\n\
                where Results.[AgencyCaseNumber] = [Incident Offenses-GTPD+APD].[OCA Number]\n\
                group by [AgencyCaseNumber])\n\
            , [Property] = (SELECT STUFF((SELECT \', \' + [ItemDescription] \n\
                    FROM [SS_GARecords_Incident].[dbo].[tblIncidentProperty] \n\
                    WHERE ([IncidentNumber] = Results.[IncidentNumber]) \n\
                    FOR XML PATH (\'\')),1,2,\'\') \n\
                FROM [SS_GARecords_Incident].[dbo].[tblIncidentProperty] Results \n\
                where Results.[IncidentNumber] = [Incident Offenses-GTPD+APD].[OCA Number]\n\
                group by [IncidentNumber])\n\
            , [Victims] = (SELECT STUFF((SELECT \', \' + CONCAT([FirstName], \' \', [MiddleName], \' \', [LastName]) \n\
                    FROM [SS_GARecords_Incident].[dbo].[tblIncidentVictim] \n\
                    WHERE ([IncidentNumber] = Results.[IncidentNumber]) \n\
                    FOR XML PATH (\'\')),1,2,\'\') \n\
                FROM [SS_GARecords_Incident].[dbo].[tblIncidentVictim] Results \n\
                where Results.[IncidentNumber] = [Incident Offenses-GTPD+APD].[OCA Number]\n\
                group by [IncidentNumber])\n\
            ,[OffenseType] = (SELECT STUFF((SELECT \', \' + [OffenseType] \n\
                    FROM [SS_GARecords_Incident].[dbo].[tblIncidentOffense] \n\
                    WHERE ([IncidentNumber] = Results.[IncidentNumber]) \n\
                    FOR XML PATH (\'\')),1,2,\'\') \n\
                FROM [SS_GARecords_Incident].[dbo].[tblIncidentProperty] Results \n\
                where Results.[IncidentNumber] = [Incident Offenses-GTPD+APD].[OCA Number]\n\
                group by [IncidentNumber])\n\
            , FORMAT([Times].[Avg Date],\'yyyy-MM-dd\') as [Average Day]\n\
            , FORMAT([Times].[Avg Time],\'hh:mm tt\') as [Average Time]\n\
            , CONCAT([St Num], \' \', [Incident Offenses-GTPD+APD].[Street]) as [Location]\n\
            , [Location Landmark] as [Location Landmark]\n\
            ,  [Offenders] = (SELECT STUFF((SELECT \', \' + CONCAT([FirstName], \' \', [MiddleName], \' \', [LastName]) \n\
                    FROM [SS_GARecords_Incident].[dbo].[tblIncidentOffender] \n\
                    WHERE ([IncidentNumber] = Results.[IncidentNumber]) \n\
                    FOR XML PATH (\'\')),1,2,\'\') \n\
                FROM [SS_GARecords_Incident].[dbo].[tblIncidentOffender] Results \n\
                where Results.[IncidentNumber] = [Incident Offenses-GTPD+APD].[OCA Number]\n\
                group by [IncidentNumber])\n\
            , [Officer Name]\n\
            , CASE WHEN LEN([OCA Number]) = 8 THEN \'GTPD\'\n\
                   WHEN LEN([OCA Number]) != 8 THEN \'APD\'\n\
              END as [Department]\n\
        FROM [CrimeAnalytics].[dbo].[Incident Offenses-GTPD+APD]\n\
            LEFT JOIN [CrimeAnalytics].[dbo].[Codes-Offense]\n\
                ON ([Incident Offenses-GTPD+APD].[Offense] = [Codes-Offense].[NIBRS_Code_Extended])\n\
            LEFT JOIN [CrimeAnalytics].[dbo].[Times]\n\
                ON ([Incident Offenses-GTPD+APD].[OCA Number] = [Times].[CASE_NUMBER])\n\
            LEFT JOIN [SS_GARecords_Citation].[dbo].[tblCitation]\n\
                ON ([Incident Offenses-GTPD+APD].[OCA Number] = [tblCitation].[AgencyCaseNumber])\n\
            LEFT JOIN [SS_GARecords_Incident].[dbo].[tblIncidentVictim]\n\
                ON ([Incident Offenses-GTPD+APD].[OCA Number] = [tblIncidentVictim].[IncidentNumber])\n\
            LEFT JOIN [SS_GARecords_Incident].[dbo].[tblIncidentMO]\n\
                ON ([Incident Offenses-GTPD+APD].[OCA Number] = [tblIncidentMO].[IncidentNumber])\n\
            LEFT JOIN [SS_GARecords_Incident].[dbo].[tblIncidentOffender]\n\
                ON ([Incident Offenses-GTPD+APD].[OCA Number] = [tblIncidentOffender].[IncidentNumber])\n\
            LEFT JOIN [SS_GARecords_Incident].[dbo].[tblIncidentOthersInvolved]\n\
                ON ([Incident Offenses-GTPD+APD].[OCA Number] = [tblIncidentOthersInvolved].[IncidentNumber])\n'+
            (additional_join_statement==null ? '' : additional_join_statement) + '\n'+
        (criteria==null ? '' : ('WHERE ' + criteria + '\n'))+
        'ORDER BY [From] DESC';
}


module.exports.locations = 
    "SELECT [Building Name],[Loc Type],[St #],[Street-MSAG],[Loc Code], [X_Coord], [Y_Coord] FROM [CrimeAnalytics].[dbo].[Codes_Addresses_Unique]"

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
        ,[X_Coord]\
        ,[Y_Coord]\
        FROM [SS_GARecords_Incident].[dbo].[tblIncident]\
        WHERE ([IncidentNumber]=\'%s\')\
    ', incident_number)
}

module.exports.get_weapon_data = function(incident_number) {
    return sprintf('\
    SELECT [tblIncidentOffense].[PrimaryKey]\
      ,[IncidentNumber]\
	  ,[tblIncidentOffenseWeapon].[Weapon]\
	  ,[Description]\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentOffense]\
	        left join [SS_GARecords_Incident].[dbo].[tblIncidentOffenseWeapon] \
                on ([tblIncidentOffenseWeapon].[ForeignKey] = [tblIncidentOffense].[PrimaryKey])\
			left join [SS_GARecords_Config].[dbo].[tblLkpIBRWeapon] \
                on ([tblIncidentOffenseWeapon].[Weapon] = [tblLkpIBRWeapon].[Code])\
	    where Weapon is not null\
        and ([IncidentNumber]=\'%s\')\
    ', incident_number)
}

module.exports.get_property_data = function(incident_number) {
    return sprintf('\
    SELECT [PrimaryKey]\
      ,[SynchronizePrimaryKey]\
      ,[IncidentNumber]\
      ,[SequenceNumber]\
      ,[SupplementNumber]\
      ,[VehicleID]\
      ,[VehicleHistoryPrimaryKey]\
      ,[TypeCode]\
      ,[Status]\
      ,[ItemValue]\
      ,[OtherJurisdiction]\
      ,[NonReportable]\
      ,[DateObtained]\
      ,[Vehicle]\
      ,[ItemCategory]\
      ,[Quantity]\
      ,[ItemDescription]\
      ,[Make]\
      ,[Model]\
      ,[SerialNumber]\
      ,[OwnerNumber]\
      ,[NCICNumber]\
      ,[PrimaryColor]\
      ,[SecondaryColor]\
      ,[LossValue]\
      ,[ReportAsProperty]\
      ,[VehicleType]\
      ,[VehicleYear]\
      ,[VehicleStyle]\
      ,[LicensePlateNumber]\
      ,[LicensePlateState]\
      ,[VIN]\
      ,[Owner]\
      ,[Recovered]\
      ,[RecoveredValue]\
      ,[RecoveredQuantity]\
      ,[RecoveredDescription]\
      ,[TimeObtained]\
      ,[ObtainedOfficerID]\
      ,[ObtainedOfficerName]\
      ,[ObtainedOfficerSSN]\
      ,[ObtainedAddress]\
      ,[ObtainedLandmark]\
      ,[ObtainedStreetNumber]\
      ,[ObtainedFraction]\
      ,[ObtainedDirectional]\
      ,[ObtainedStreet]\
      ,[ObtainedLocation]\
      ,[ObtainedMailingAddress]\
      ,[ObtainedCity]\
      ,[ObtainedState]\
      ,[ObtainedZipCode]\
      ,[ObtainedLatitude]\
      ,[ObtainedLongitude]\
      ,[ObtainedAltitude]\
      ,[ObtainedFrom]\
      ,[RelatedOffense]\
      ,[RegistrationYear]\
      ,[InsuranceCompany]\
      ,[IdentificationType]\
      ,[MotorSize]\
      ,[Transmission]\
      ,[StolenVehicle]\
      ,[RecoveredVehicle]\
      ,[SuspectsVehicle]\
      ,[Involvement]\
      ,[InvolvementDescription]\
      ,[Description]\
  FROM [SS_GARecords_Incident].[dbo].[tblIncidentProperty]\
    left join [SS_GARecords_Config].[dbo].[tblLkpIBRProperty] \
        on ([tblLkpIBRProperty].[Code] = [tblIncidentProperty].[TypeCode])\
  WHERE ([IncidentNumber]=\'%s\')\
  order by [SequenceNumber]\
    ', incident_number)
}

module.exports.get_time = function(incident_number) {
    return sprintf('\
    SELECT [IncidentNumber]\
      ,[ReportDate]\
      ,[ReportTime]\
      ,[DateIncidentEnded]\
      ,[TimeIncidentEnded]\
      ,[IncidentDate]\
      ,[IncidentTime]\
    FROM [SS_GARecords_Incident].[dbo].[tblIncident]\
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
module.exports.get_victim = function(incident_number) {
    return sprintf('\
    SELECT [IncidentNumber]\
      ,[SequenceNumber]\
      ,[SupplementNumber]\
      ,[PersonID]\
      ,[NameHistoryPrimaryKey]\
      ,[VictimType]\
      ,[Age]\
      ,[Race]\
      ,[Sex]\
      ,[FirstName]\
      ,[FirstNameMetaphone]\
      ,[MiddleName]\
      ,[MiddleNameMetaphone]\
      ,[LastName]\
      ,[LastNameMetaphone]\
      ,[Suffix]\
      ,[DateOfBirth]\
      ,[SSN]\
      ,[HomeAddress]\
      ,[HomeLandmark]\
      ,[HomeStreetNumber]\
      ,[HomeFraction]\
      ,[HomeDirectional]\
      ,[HomeStreet]\
      ,[HomeLocation]\
      ,[HomeMailingAddress]\
      ,[HomeCity]\
      ,[HomeState]\
      ,[HomeZipCode]\
      ,[HomeLatitude]\
      ,[HomeLongitude]\
      ,[HomeAltitude]\
      ,[HomePhoneNumber]\
      ,[Occupation]\
      ,[Employer]\
      ,[EmployerAddress]\
      ,[EmployerLandmark]\
      ,[EmployerStreetNumber]\
      ,[EmployerFraction]\
      ,[EmployerDirectional]\
      ,[EmployerStreet]\
      ,[EmployerLocation]\
      ,[EmployerMailingAddress]\
      ,[EmployerCity]\
      ,[EmployerState]\
      ,[EmployerZipCode]\
      ,[EmployerLatitude]\
      ,[EmployerLongitude]\
      ,[EmployerAltitude]\
      ,[EmployerPhoneNumber]\
      ,[Ethnicity]\
      ,[EmployerPhoneExtension]\
      ,[OfficerActivity]\
      ,[OfficerAssignment]\
      ,[Student]\
      ,[CensusTract]\
      ,[VictimSchool]\
      ,[Juvenile]\
      ,[SecondaryPhoneNumber]\
      ,[DriverLicenseNumber]\
      ,[DriverLicenseState]\
      ,[JustifiableCircumstance]\
      ,[ResidentStatus]\
      ,[OtherORINumber]\
  FROM [SS_GARecords_Incident].[dbo].[tblIncidentVictim]\
  WHERE ([IncidentNumber]=\'%s\')\
    ', incident_number)
}
module.exports.get_complainant = function(incident_number) {
    return sprintf('SELECT [IncidentNumber]\
      ,[SequenceNumber]\
      ,[SupplementNumber]\
      ,[PersonID]\
      ,[NameHistoryPrimaryKey]\
      ,[PersonType]\
      ,[FirstName]\
      ,[FirstNameMetaphone]\
      ,[MiddleName]\
      ,[MiddleNameMetaphone]\
      ,[LastName]\
      ,[LastNameMetaphone]\
      ,[Suffix]\
      ,[DateOfBirth]\
      ,[Age]\
      ,[Race]\
      ,[Sex]\
      ,[HomeAddress]\
      ,[HomeLandmark]\
      ,[HomeStreetNumber]\
      ,[HomeFraction]\
      ,[HomeDirectional]\
      ,[HomeStreet]\
      ,[HomeLocation]\
      ,[HomeMailingAddress]\
      ,[HomeCity]\
      ,[HomeState]\
      ,[HomeZipCode]\
      ,[HomeLatitude]\
      ,[HomeLongitude]\
      ,[HomeAltitude]\
      ,[HomePhoneNumber]\
      ,[Employer]\
      ,[EmployerAddress]\
      ,[EmployerLandmark]\
      ,[EmployerStreetNumber]\
      ,[EmployerFraction]\
      ,[EmployerDirectional]\
      ,[EmployerStreet]\
      ,[EmployerLocation]\
      ,[EmployerMailingAddress]\
      ,[EmployerCity]\
      ,[EmployerState]\
      ,[EmployerZipCode]\
      ,[EmployerLatitude]\
      ,[EmployerLongitude]\
      ,[EmployerAltitude]\
      ,[EmployerPhoneNumber]\
      ,[EmployerPhoneExtension]\
      ,[Juvenile]\
      ,[SecondaryPhoneNumber]\
      ,[DriverLicenseNumber]\
      ,[DriverLicenseState]\
  FROM [SS_GARecords_Incident].[dbo].[tblIncidentOthersInvolved]\
  WHERE ([IncidentNumber]=\'%s\')\
    ', incident_number)
}
module.exports.get_offender = function(incident_number) {
    return sprintf('\
        SELECT *\n\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentOffender]\n\
        WHERE ([IncidentNumber]=\'%s\')\n\
        Order by [SequenceNumber]\
    ', incident_number)
}
module.exports.get_wr = function() {
    return sprintf('\
        SELECT *\n\
        FROM [SS_GARecords_Warning].[dbo].[tblWarningCharge]\n\
    ')
}


module.exports.get_narrative_APD = function(incident_number) {
    return sprintf('\
        SELECT *\n\
        FROM [CrimeAnalytics].[dbo].[APD Narratives]\n\
        WHERE ([offense_id]=\'%s\')\n\
    ', incident_number)
}
module.exports.get_offense = function(incident_number) {
    return sprintf('\
        SELECT *\n\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentOffense]\n\
        WHERE ([IncidentNumber]=\'%s\')\n\
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

module.exports.get_distinct_mo = function() {
    return sprintf('\
        SELECT distinct [MO]\
        from [SS_GARecords_Incident].[dbo].[tblIncidentMO]'
    )
}

module.exports.get_repeat_offender = function(date) {
    return sprintf('\
        SELECT [Last Name]\
            ,[First Name]\
            ,[Middle Name]\
            , [PersonID] = (SELECT top 1 [PersonID]\
                FROM [SS_GARecords_Incident].[dbo].[tblIncidentOffender] Results\
                where Results.[FirstName] = [GT_Repeat_Offenders].[First Name] and Results.[LastName] = [GT_Repeat_Offenders].[Last Name] and Results.[DateOfBirth] = [GT_Repeat_Offenders].[DOB]\
                group by [PersonID]\
                order by [PersonID] DESC)\
            ,[Aliases]\
            ,[Race]\
            ,[Sex]\
            ,FORMAT([DOB],\'yyyy-MM-dd\') as [DOB]\
            ,[DOB2]\
            ,CASE WHEN [Height] is not null THEN CONCAT(SUBSTRING([Height], 1, 1), \'\'\'\', SUBSTRING([Height], 2, 2))\
                WHEN [Height] is null THEN null\
                END AS [Height]\
            ,[Max Address]\
            ,[Min ArrDate]\
            ,FORMAT([Max ArrDate],\'yyyy-MM-dd\') as [Max ArrDate]\
            ,[Min UCR]\
            ,[Max UCR]\
            ,[GT Arrests]\
            ,[State Custody]\
            ,[State Release Date]\
            ,[County Custody]\
            ,[County Booking Date]\
            ,[County Release Date]\
            ,[Parole End Date]\
            ,[In Custody Now]\
            ,[Date Updated]\
            ,[Vine]\
            ,[SO ID]\
            ,[GDC ID]\
        FROM [CrimeAnalytics].[dbo].[GT_Repeat_Offenders]\
        ORDER BY [Max ArrDate] DESC\
    ')
}
// have another function that checks all of the personid and returns the names in an array
module.exports.get_repeat_offender_name = function(ids) {
    idList = ''
    idList = ids[0]['PersonID']
    for(var i = 1; i<ids.length;i++){
        idList+=', \'' + ids[i]['PersonID']+'\''
    }
    return sprintf('\
    SELECT [PersonID]\
    ,[FirstName]\
    ,[LastName]\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentOffender]\
    where [PersonID] in (%s)\n\
    ', idList)
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
    
    finalScript=''

    //OFFICER NAME
    officerName = (body.officerName ? body.officerName : '')

    //ADDRESS
    address = (body.streetName ? body.streetName : '')

    //Location code
    code = "LIKE '%%'"
    if(body.selectedLocationCode && body.selectedLocationCode.value !== 'Any') {
        code = "LIKE \'%%"+body.selectedLocationCode.value+'%%\''
    } else {
        code = "NOT LIKE \'APD\'"
    }

    //building
    buildings = ""
    buildingScript = ''
    if(body.selectedBuilding != null && body.selectedBuilding.length > 0) {
        building_list_scriptx = ''
        body.selectedBuilding.forEach((item)=>{ building_list_scriptx += ('\'' + item['X_Coord'] + '\'' + ',') })
        building_list_scriptx = building_list_scriptx.substring(0, building_list_scriptx.length-1)
        building_list_scripty = ''
        body.selectedBuilding.forEach((item)=>{ building_list_scripty += ('\'' + item['Y_Coord'] + '\'' + ',') })
        building_list_scripty = building_list_scripty.substring(0, building_list_scripty.length-1)
        buildingScript = 'AND ([Longitude] in (' + building_list_scriptx + ') AND [Latitude] in (' + building_list_scripty + '))'
    } else if(body.selectedGTLocationType && body.selectedGTLocationType.value != 'Any') {
        buildingScript = 'AND ([Loc Type] = \'' + body.selectedGTLocationType.value + '\' AND LEN([OCA Number]) = 8)'
    }
    finalScript+=buildingScript

    zone = ""
    if(body.selectedZone && body.selectedZone.value !== 'Any') {
        zone = " AND [Patrol Zone] LIKE \'"+body.selectedZone.value+'\''
    }
    finalScript+=zone
    MO = ""
    if(body.MO && body.MO.value !== 'Any') {
        MO = " AND [tblIncidentMO].[MO] LIKE \'"+body.MO.value+'\''
    }
    finalScript+=MO
    
    mentalCriteria = ''
    if(body.selectedMental) {
        mentalCriteria = ' AND ('
        for(var i=0;i<body.selectedMental.length;i++) {
            if(i>0){
                mentalCriteria+=' OR '
            }
            if(body.selectedMental[i].value === 'EMS'){
                mentalCriteria+='([EMS] is not null)'
            } else if(body.selectedMental[i].value === '1013'){
                mentalCriteria+='([1013] > 0)'
            }else if(body.selectedMental[i].value === 'Suicide'){
                mentalCriteria+='([Suicide] is not null)'
            }else if(body.selectedMental[i].value === 'Injury'){
            mentalCriteria+='([Injured] is not null)'
        }
        }
        mentalCriteria+=')'
    }
    finalScript+=mentalCriteria

    drugAlcCriteria = ''
    var drugAlc = []
    if(body.drug) {
        drugAlc.push('([Drug] > 0)')
    }
    if(body.alcohol) {
        drugAlc.push('([Alcohol] > 0)')
    }
    if(body.weapon) {
        drugAlc.push('([Weapon] is not null)')
    }

    if(drugAlc.length > 0) {
        drugAlcCriteria += 'AND ('
        for(var i=0;i<drugAlc.length;i++) {
            if(i>0){
                drugAlcCriteria+=' OR '
            }
            drugAlcCriteria += drugAlc[i]
        }
        drugAlcCriteria+=')'
    }
    finalScript+=drugAlcCriteria

    var outcomeScript = ''
    if(body.selectedOutcome) {
        if(body.selectedOutcome.length === 1) {
            if(body.selectedOutcome[0].value === 'M') {
                outcomeScript = ' AND [OffenseType] = \'M\''
            } else {
                outcomeScript = ' AND [OffenseType] = \'F\''
            }
        } else {
            outcomeScript = ' AND [OffenseType] in (\'M\', \'F\')'
        }
    }
    finalScript+=outcomeScript

    var arrestScript = ''
    if(body.selectedArrest) {
        if(body.selectedArrest) {
            arrestScript=' AND [Arrest] = \'true\''
        }
    }
    finalScript+=arrestScript

    //SHIFTS AND TEAMS
    if(body.selectedShift) {
        unit = " AND ([Unit] LIKE \'" + body.selectedShift[0].label + "\'"
        for(var i = 1; i < body.selectedShift.length; i++) {
            unit += " OR [Unit] LIKE '" + body.selectedShift[i].label + "'"
        }
        unit += ")" 
    } else {
        unit = ''
    }
    finalScript+=unit
    if(body.selectedOccurredShift) {
        shift = " AND ([Shift2] LIKE '" + body.selectedOccurredShift[0].label + "'"
        for(var i = 1; i < body.selectedOccurredShift.length; i++) {
            shift += " OR [Shift2] LIKE '" + body.selectedOccurredShift[i].label + "'"
        }
        shift += ")" 
    } else {
        shift = ''
    }
    finalScript+=shift

    //CRIMES AND CATEGORIES
    if(body.selectedCrimeType) {
        crime = " AND ([Offense] LIKE '" + body.selectedCrimeType[0]['NIBRS_Code_Extended'] + "'"
        for(var i = 1; i < body.selectedCrimeType.length; i++) {
            crime += " OR [Offense] LIKE '" + body.selectedCrimeType[i]['NIBRS_Code_Extended'] + "'"
        }
        crime += ")"
    } else if (body.selectedCrimeCategory && body.selectedCrimeCategory.value !== "Any") {
        crime = " AND [NIBRS_Category] LIKE '" + body.selectedCrimeCategory.value + "'"
    } else {
        crime = ''
    }
    finalScript+=crime


    if(body.selectedCitation) {
        citation = " AND ([Statute] LIKE \'" + body.selectedCitation[0].value + "%\'"
        for(var i = 1; i < body.selectedCitation.length; i++) {
            citation += " OR [Statute] LIKE \'" + body.selectedCitation[0].value + "%\'"
        }
        citation += ")" 
    } else {
        citation = ''
    }
    finalScript+=citation


    
    return sprintf(
        "SELECT MONTH([Report Date]) as [Month], COUNT(*) as [COUNT]\n\
        FROM [CrimeAnalytics].[dbo].[Incident Offenses-GTPD+APD]\n\
        FULL OUTER JOIN [CrimeAnalytics].[dbo].[Codes-Offense] ON [Incident Offenses-GTPD+APD].[Offense] = [Codes-Offense].[NIBRS_Code_Extended]\n\
        Left Join [SS_GARecords_Incident].[dbo].[tblIncidentMO]\n\
            ON ([tblIncidentMO].[IncidentNumber]=[Incident Offenses-GTPD+APD].[OCA Number])\n\
        Left Join [SS_GARecords_Incident].[dbo].[tblIncidentOffense]\n\
            ON ([tblIncidentOffense].[IncidentNumber]=[Incident Offenses-GTPD+APD].[OCA Number])\n\
        Left Join [SS_GARecords_Incident].[dbo].[tblIncidentOffender]\n\
            ON ([tblIncidentOffender].[IncidentNumber]=[Incident Offenses-GTPD+APD].[OCA Number])\n\
        Left Join [CrimeAnalytics].[dbo].[Times]\n\
            ON ([Times].[CASE_NUMBER]=[Incident Offenses-GTPD+APD].[OCA Number])\n\
        LEFT JOIN [CrimeAnalytics].[dbo].[Codes_Addresses_Unique] ON (CAST([Codes_Addresses_Unique].[St #] as nvarchar(255)) = [Incident Offenses-GTPD+APD].[St Num]\n\
            AND [Codes_Addresses_Unique].[Street Name] = [Incident Offenses-GTPD+APD].[Street Name])\n\
            WHERE YEAR([Report Date]) =\'%d'\n\
        AND [Officer Name] LIKE \'%%%s%%'\n\
        AND [Incident Offenses-GTPD+APD].[Address] LIKE \'%%%s%%'\n\
        AND [Location Code] \%s\n\
        \%s\n\
        GROUP BY MONTH([Report Date])\
        ORDER BY MONTH([Report Date])"
        ,body.selectedYear.value, 
        officerName, 
        address, 
        code, 
        finalScript
    )
}
module.exports.getTimeCount = function(body) {

    finalScript = ''
    //OFFICER NAME
    officerName = (body.officerName ? body.officerName : '')

    //ADDRESS
    address = (body.streetName ? body.streetName : '')


    //Location code
    code = "LIKE '%%'"
    if(body.selectedLocationCode && body.selectedLocationCode.value !== 'Any') {
        code = "LIKE \'%%"+body.selectedLocationCode.value+'%%\''
    } else {
        code = "NOT LIKE \'APD\'"
    }

    //SHIFTS AND TEAMS
    if(body.selectedShift) {
        unit = " AND ([Unit] LIKE '" + body.selectedShift[0].label + "'"
        for(var i = 1; i < body.selectedShift.length; i++) {
            unit += " OR [Unit] LIKE '" + body.selectedShift[i].label + "'"
        }
        unit += ")" 
    } else {
        unit = ''
    }
    finalScript+=unit

    //building
    buildings = ""
    buildingScript = ''
    if(body.selectedBuilding != null && body.selectedBuilding.length > 0) {
        building_list_scriptx = ''
        body.selectedBuilding.forEach((item)=>{ building_list_scriptx += ('\'' + item['X_Coord'] + '\'' + ',') })
        building_list_scriptx = building_list_scriptx.substring(0, building_list_scriptx.length-1)
        building_list_scripty = ''
        body.selectedBuilding.forEach((item)=>{ building_list_scripty += ('\'' + item['Y_Coord'] + '\'' + ',') })
        building_list_scripty = building_list_scripty.substring(0, building_list_scripty.length-1)
        buildingScript = 'AND ([Longitude] in (' + building_list_scriptx + ') AND [Latitude] in (' + building_list_scripty + '))'
    } else if(body.selectedGTLocationType && body.selectedGTLocationType.value != 'Any') {
        buildingScript = 'AND ([Loc Type] = \'' + body.selectedGTLocationType.value + '\' AND LEN([OCA Number]) = 8)'
    }
    finalScript+=buildingScript

    if(body.selectedOccurredShift) {
        shift = " AND ([Shift2] LIKE '" + body.selectedOccurredShift[0].label + "'"
        for(var i = 1; i < body.selectedOccurredShift.length; i++) {
            shift += " OR [Shift2] LIKE '" + body.selectedOccurredShift[i].label + "'"
        }
        shift += ")" 
    } else {
        shift = ''
    }
    finalScript+=shift

    zone = ""
    if(body.selectedZone && body.selectedZone.value !== 'Any') {
        zone = " AND [Patrol Zone] LIKE \'"+body.selectedZone.value+'\''
    }
    finalScript+=zone
    MO = ""
    if(body.MO && body.MO.value !== 'Any') {
        MO = " AND [tblIncidentMO].[MO] LIKE \'"+body.MO.value+'\''
    }
    finalScript+=MO
    
    mentalCriteria = ''
    if(body.selectedMental) {
        mentalCriteria = ' AND ('
        for(var i=0;i<body.selectedMental.length;i++) {
            if(i>0){
                mentalCriteria+=' OR '
            }
            if(body.selectedMental[i].value === 'EMS'){
                mentalCriteria+='([EMS] is not null)'
            } else if(body.selectedMental[i].value === '1013'){
                mentalCriteria+='([1013] > 0)'
            }else if(body.selectedMental[i].value === 'Suicide'){
                mentalCriteria+='([Suicide] is not null)'
            }else if(body.selectedMental[i].value === 'Injury'){
            mentalCriteria+='([Injured] is not null)'
        }
        }
        mentalCriteria+=')'
    }
    finalScript+=mentalCriteria

    drugAlcCriteria = ''
    var drugAlc = []
    if(body.drug) {
        drugAlc.push('([Drug] > 0)')
    }
    if(body.alcohol) {
        drugAlc.push('([Alcohol] > 0)')
    }
    if(body.weapon) {
        drugAlc.push('([Weapon] is not null)')
    }

    if(drugAlc.length > 0) {
        drugAlcCriteria += 'AND ('
        for(var i=0;i<drugAlc.length;i++) {
            if(i>0){
                drugAlcCriteria+=' OR '
            }
            drugAlcCriteria += drugAlc[i]
        }
        drugAlcCriteria+=')'
    }
    finalScript+=drugAlcCriteria

    var outcomeScript = ''
    if(body.selectedOutcome) {
        if(body.selectedOutcome.length === 1) {
            if(body.selectedOutcome[0].value === 'M') {
                outcomeScript = ' AND [OffenseType] = \'M\''
            } else {
                outcomeScript = ' AND [OffenseType] = \'F\''
            }
        } else {
            outcomeScript = ' AND [OffenseType] in (\'M\', \'F\')'
        }
    }
    finalScript+=outcomeScript

    var arrestScript = ''
    if(body.selectedArrest) {
        if(body.selectedArrest) {
            arrestScript=' AND [Arrest] = \'true\''
        }
    }
    finalScript+=arrestScript

    if(body.selectedCitation) {
        citation = " AND ([Statute] LIKE \'" + body.selectedCitation[0].value + "%\'"
        for(var i = 1; i < body.selectedCitation.length; i++) {
            citation += " OR [Statute] LIKE \'" + body.selectedCitation[0].value + "%\'"
        }
        citation += ")" 
    } else {
        citation = ''
    }
    finalScript+=citation

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
        "SELECT datepart(hour, DATEADD(HOUR,  DATEDIFF(HOUR, (CAST([From Date] as DATETIME) + CAST([From Time] as DATETIME)), (CAST([To Date] as DATETIME) + CAST([To Time] as DATETIME)))/2, CAST([From Date] as DATETIME) + CAST([From Time] as DATETIME))) as [Hour], \n\
        COUNT(*) AS [Count]\n\
        FROM [CrimeAnalytics].[dbo].[Incident Offenses-GTPD+APD]\n\
        FULL OUTER JOIN [CrimeAnalytics].[dbo].[Codes-Offense]\n\
            ON [Incident Offenses-GTPD+APD].[Offense] = [Codes-Offense].[NIBRS_Code_Extended]\n\
        Left Join [SS_GARecords_Incident].[dbo].[tblIncidentMO]\n\
            ON ([tblIncidentMO].[IncidentNumber]=[Incident Offenses-GTPD+APD].[OCA Number])\n\
        Left Join [SS_GARecords_Incident].[dbo].[tblIncidentOffense]\n\
            ON ([tblIncidentOffense].[IncidentNumber]=[Incident Offenses-GTPD+APD].[OCA Number])\n\
        Left Join [SS_GARecords_Incident].[dbo].[tblIncidentOffender]\n\
            ON ([tblIncidentOffender].[IncidentNumber]=[Incident Offenses-GTPD+APD].[OCA Number])\n\
        Left Join [CrimeAnalytics].[dbo].[Times]\n\
            ON ([Times].[CASE_NUMBER]=[Incident Offenses-GTPD+APD].[OCA Number])\n\
        LEFT JOIN [CrimeAnalytics].[dbo].[Codes_Addresses_Unique] ON (CAST([Codes_Addresses_Unique].[St #] as nvarchar(255)) = [Incident Offenses-GTPD+APD].[St Num]\n\
            AND [Codes_Addresses_Unique].[Street Name] = [Incident Offenses-GTPD+APD].[Street Name])\n\
        WHERE YEAR([Report Date]) =\'%d'\n\
        AND [Officer Name] LIKE \'%%%s%%'\n\
        AND [Incident Offenses-GTPD+APD].[Address] LIKE \'%%%s%%'\n\
        AND [Location Code] \%s\n\
        AND DATEDIFF(HOUR, (CAST([From Date] as DATETIME) + CAST([From Time] as DATETIME)), (CAST([To Date] as DATETIME) + CAST([To Time] as DATETIME))) < 4\
        \%s\n\
		GROUP BY (datepart(hour, DATEADD(HOUR,  DATEDIFF(HOUR, (CAST([From Date] as DATETIME) + CAST([From Time] as DATETIME)), (CAST([To Date] as DATETIME) + CAST([To Time] as DATETIME)))/2, CAST([From Date] as DATETIME) + CAST([From Time] as DATETIME))))\
		ORDER BY (datepart(hour, DATEADD(HOUR,  DATEDIFF(HOUR, (CAST([From Date] as DATETIME) + CAST([From Time] as DATETIME)), (CAST([To Date] as DATETIME) + CAST([To Time] as DATETIME)))/2, CAST([From Date] as DATETIME) + CAST([From Time] as DATETIME))))"
        ,body.selectedYear.value, 
        officerName, 
        address, 
        code, 
        finalScript
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
module.exports.get_name = function(body) {
    return sprintf('SELECT top 1 [FirstName], [LastName]\
            FROM [SS_GARecords_Incident].[dbo].[tblIncidentOffender]\
                where [PersonID] = \'%s\'',body.personID.toString())
}

/* Queries for filters */
module.exports.filter_repeat_offender = function(criteria) {
    top_count = 'top 1000'

    criteria_script ='(CONCAT([tblIncidentOffender].[FirstName], \' \', [tblIncidentOffender].[LastName]) like \'%%'+criteria.typedName+'%%\')'
    console.log(criteria_script.length)
    return this.showall(top_count = top_count, additional_join_statement = null, 
                        criteria = criteria_script.length==0 ? null : criteria_script)
}

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
            building_list_scriptx = ''
            criteria.selectedBuilding.forEach((item)=>{ building_list_scriptx += ('\'' + item['X_Coord'] + '\'' + ',') })
            building_list_scriptx = building_list_scriptx.substring(0, building_list_scriptx.length-1)
            building_list_scripty = ''
            criteria.selectedBuilding.forEach((item)=>{ building_list_scripty += ('\'' + item['Y_Coord'] + '\'' + ',') })
            building_list_scripty = building_list_scripty.substring(0, building_list_scripty.length-1)
            gtpd_criteria_script = '([Longitude] in (' + building_list_scriptx + ') AND LEN([OCA Number]) = 8 AND [Latitude] in (' + building_list_scripty + '))'
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
            building_list_scriptx = ''
            criteria.selectedAPDBuilding.forEach((item)=>{ building_list_scriptx += ('\'' + item['X_Coord'] + '\'' + ',') })
            building_list_scriptx = building_list_scriptx.substring(0, building_list_scriptx.length-1)
            building_list_scripty = ''
            criteria.selectedAPDBuilding.forEach((item)=>{ building_list_scripty += ('\'' + item['Y_Coord'] + '\'' + ',') })
            building_list_scripty = building_list_scripty.substring(0, building_list_scripty.length-1)
            apd_criteria_script = '([Longitude] in (' + building_list_scriptx + ') AND LEN([OCA Number]) = 9 AND [Latitude] in (' + building_list_scripty + '))'
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
        if((criteria.selectedAPDBuilding == null || criteria.selectedAPDBuilding.length == 0) && criteria.selectedAPDLocationType.value == 'Any'){
            criteria.selectedDepartment.value = 'gtpDepartment'
        } else if((criteria.selectedBuilding == null || criteria.selectedBuilding.length == 0) && criteria.selectedGTLocationType.value == 'Any') {
            criteria.selectedDepartment.value = 'apDepartment'
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

    // Felony/Misdemeanor
    var outcomeScript = ''
    if(criteria.selectedOutcome) {
        if(criteria.selectedOutcome.length === 1) {
            if(criteria.selectedOutcome[0].value === 'M') {
                outcomeScript = '[OffenseType] = \'M\''
            } else {
                outcomeScript = '[OffenseType] = \'F\''
            }
        } else {
            outcomeScript = '[OffenseType] in (\'M\', \'F\')'
        }
    }
    if(outcomeScript) {
        criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ') + outcomeScript
    }

    /* Date Filter */
    var dateTimeOptionScript = ''
    if(criteria.dateTimeOption === 'avg' || criteria.dateTimeOption === null) {
        dateTimeOptionScript = '((' + '[Avg Date] >= \'' + criteria.startDate + '\' AND [Avg Date] <= \'' + criteria.endDate + '\') OR (' + '[From Date] >= \'' + criteria.startDate + '\' AND [To Date] <= \'' + criteria.endDate + '\'))'
        if(criteria.selectedCustomTime) {
            dateTimeOptionScript +='AND (' + '[Avg Time] >= \'1899-12-30 ' + criteria.fromTime + '\' AND [Avg Time] <= \'1899-12-30 ' + criteria.toTime + '\')'
        }
        
    } else if(criteria.dateTimeOption === 'from') {
        dateTimeOptionScript = '(' + '[From Date] >= \'' + criteria.startDate + '\' AND [From Date] <= \'' + criteria.endDate + '\')'
        if(criteria.selectedCustomTime) {
            dateTimeOptionScript +='AND (' + '[From Time] >= \'1899-12-30 ' + criteria.fromTime + '\' AND [From Time] <= \'1899-12-30 ' + criteria.toTime + '\')'
        }
    } else if(criteria.dateTimeOption === 'to') {
        dateTimeOptionScript = '(' + '[To Date] >= \'' + criteria.startDate + '\' AND [To Date] <= \'' + criteria.endDate + '\')'
        if(criteria.selectedCustomTime) {
            dateTimeOptionScript +='AND (' + '[To Time] >= \'1899-12-30 ' + criteria.fromTime + '\' AND [To Time] <= \'1899-12-30 ' + criteria.toTime + '\')'
        }
    } else if(criteria.dateTimeOption === 'report') {
        dateTimeOptionScript = '(' + '[Report Date] >= \'' + criteria.startDate + '\' AND [Report Date] <= \'' + criteria.endDate + '\')'
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


    arrest_script=''
    if(criteria.selectedArrest) // Arrests/CT Warnings
    {
        arrest_script='[Arrest] = \'true\''
    }
    if(arrest_script) {
        criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ') + arrest_script
    }


    if(criteria.selectedCaseStatus) {
        if(criteria.selectedCaseStatus.value !== "Any") {
            criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ')
                + '[Case Status] = \'' + criteria.selectedCaseStatus.value + '\''
        }
    }
    citationScript = ''
    if(criteria.selectedCitation) {
        if(criteria.selectedCitation.length >= 1) {
            if(criteria.selectedCitation[0].value == 'Other') {
                citationScript = '(([ViolationCode] not like \'16%%\' AND [ViolationCode] not like \'40%%\')'
            } else {
                citationScript = '([ViolationCode] like \'' + criteria.selectedCitation[0].value + '%%\''
            }
        }
        if(criteria.selectedCitation.length == 2) {
            if(criteria.selectedCitation[1].value == 'Other') {
                citationScript += 'OR ([ViolationCode] not like \'16%%\' AND [ViolationCode] not like \'40%%\')'
            } else {
                citationScript += 'OR ([ViolationCode] like \'' + criteria.selectedCitation[1].value + '%%\')'
            }        
        }
        citationScript += ')'
        if(criteria.selectedCitation.length == 2) {
            citaitonScript = '[ViolationCode] not null'
        }
    }

    if(citationScript) {
        criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ') + citationScript
    }

    mentalCriteria = ''
    if(criteria.selectedMental) {
        mentalCriteria = '('
        for(var i=0;i<criteria.selectedMental.length;i++) {
            if(i>0){
                mentalCriteria+=' OR '
            }
            if(criteria.selectedMental[i].value === 'EMS'){
                mentalCriteria+='([EMS] is not null)'
            } else if(criteria.selectedMental[i].value === '1013'){
                mentalCriteria+='([1013] > 0)'
            }else if(criteria.selectedMental[i].value === 'Suicide'){
                mentalCriteria+='([Suicide] is not null)'
            }else if(criteria.selectedMental[i].value === 'Injury'){
            mentalCriteria+='([Injured] is not null)'
        }
        }
        mentalCriteria+=')'
    }
    if(mentalCriteria) {
        criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ') + mentalCriteria
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
    occurredShiftCriteria = ''
    if(criteria.occurredShift) {
        if(criteria.occurredShift.length ===3) {
            occurredShiftCriteria = '([Shift2] in(\'' + criteria.occurredShift[0].label + '\', \'' + criteria.occurredShift[1].label + '\', \''+ criteria.occurredShift[2].label + '\'))'
        } else if(criteria.occurredShift.length === 2) {
            occurredShiftCriteria = '([Shift2] in(\'' + criteria.occurredShift[0].label + '\', \'' + criteria.occurredShift[1].label + '\'))'
        } else {
            occurredShiftCriteria = '([Shift2] in(\'' + criteria.occurredShift[0].label + '\'))'
        }
    }
    if(occurredShiftCriteria) {
        criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ') + occurredShiftCriteria
    }

    drugAlcCriteria = ''
    var drugAlc = []
    if(criteria.drug) {
        drugAlc.push('([Drug] > 0)')
    }
    if(criteria.alcohol) {
        drugAlc.push('([Alcohol] > 0)')
    }
    if(criteria.weapon) {
        drugAlc.push('([Weapon] is not null)')
    }

    if(drugAlc.length > 0) {
        drugAlcCriteria += '('
        for(var i=0;i<drugAlc.length;i++) {
            if(i>0){
                drugAlcCriteria+=' OR '
            }
            drugAlcCriteria += drugAlc[i]
        }
        drugAlcCriteria+=')'
    }
    if(drugAlcCriteria) {
        criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ') + drugAlcCriteria
    }

    zoneCriteria = ''
    if(criteria.selectedZone && criteria.selectedZone.value != 'Any') {
        zoneCriteria = '[Patrol Zone] = \''+criteria.selectedZone.value+'\''
    }
    if(zoneCriteria) {
        criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ') + zoneCriteria
    }

    locationCodeCriteria = ''
    if(criteria.selectedLocationCode && criteria.selectedLocationCode.value!='Any') {
        locationCodeCriteria = '[Location Code] = \''+criteria.selectedLocationCode.value+'\''
    }
    if(locationCodeCriteria) {
        criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ') + locationCodeCriteria
    }

    MOCriteria = ''
    if(criteria.MO && criteria.MO.value != 'Any') {
        MOCriteria = '[tblIncidentMO].[MO] = \''+criteria.MO.value+'\''
    }
    if(MOCriteria) {
        criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ') + MOCriteria
    }

    nameCriteria = ''
    if(criteria.selectedName && criteria.typedName) {
        nameCriteria = '('
        for(var i=0;i<criteria.selectedName.length;i++) {
            if(i>0){
                nameCriteria+=' OR '
            }
            if(criteria.selectedName[i].value === 'offender'){
                nameCriteria+='(CONCAT([tblIncidentOffender].[FirstName], \' \', [tblIncidentOffender].[LastName]) like \'%%'+criteria.typedName+'%%\')'
            } else if(criteria.selectedName[i].value === 'victim'){
                nameCriteria+='(CONCAT([tblIncidentVictim].[FirstName], \' \', [tblIncidentVictim].[LastName]) like \'%%'+criteria.typedName+'%%\')'
            }else if(criteria.selectedName[i].value === 'complainant'){
                nameCriteria+='(CONCAT([tblIncidentOthersInvolved].[FirstName], \' \', [tblIncidentOthersInvolved].[LastName]) like \'%%'+criteria.typedName+'%%\')'
            }
        }
        nameCriteria+=')'
    }
    if(nameCriteria) {
        criteria_script = (criteria_script.length == 0 ? '' : criteria_script + ' AND ') + nameCriteria
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