const sprintf = require('sprintf-js').sprintf;

// TODO: add more methods for common query generation

module.exports.showall = function() {
    return sprintf('\
        SELECT distinct top 1000 [OCA Number] as [Incident Number]\
            , CONVERT(varchar, [Report Date], 23) as [Report Date]\
            , convert(varchar, [From Time], 8) as [Time]\
            , CASE  WHEN [Incident Offenses-GTPD+APD].[SRSOffense] is not null AND LEN([Incident Offenses-GTPD+APD].[SRSOffense]) = 3 THEN [NIBRS_Category]\
                    WHEN [Incident Offenses-GTPD+APD].[SRSOffense] is not null AND LEN([Incident Offenses-GTPD+APD].[SRSOffense]) != 3 THEN [Inc_Desc_PCase]\
                    WHEN [Incident Offenses-GTPD+APD].[SRSOffense] is null AND [Incident Offenses-GTPD+APD].[NIBRSOffense] is not null THEN [NIBRS_Category]\
                    WHEN [Incident Offenses-GTPD+APD].[SRSOffense] is null AND [Incident Offenses-GTPD+APD].[NIBRSOffense] is null AND LEN([Incident Offenses-GTPD+APD].[Offense]) = 3 THEN [NIBRS_Category]\
                    WHEN [Incident Offenses-GTPD+APD].[SRSOffense] is null AND [Incident Offenses-GTPD+APD].[NIBRSOffense] is null AND LEN([Incident Offenses-GTPD+APD].[Offense]) != 3 THEN [Inc_Desc_PCase]\
              END as [Description]\
            , CONCAT([St Num], \' \', [Street]) as [Street]\
            , [Location Landmark] as [Location Name]\
            , CONCAT([FirstName], \' \', [MiddleName], \' \', [LastName]) AS [Offender Name]\
            , [Officer Name]\
            , CASE WHEN [GT] = 1 THEN \'GTPD\'\
                   WHEN [GT] = 0 THEN \'APD\'\
              END as [Department]\n\
        FROM [CrimeAnalytics].[dbo].[Incident Offenses-GTPD+APD]\
            LEFT JOIN [CrimeAnalytics].[dbo].[Codes-Offense]\
                ON ( ([Incident Offenses-GTPD+APD].[SRSOffense] is not null AND LEN([Incident Offenses-GTPD+APD].[SRSOffense]) = 3 AND [Incident Offenses-GTPD+APD].[SRSOffense] = [Codes-Offense].[NIBRS_Offense_code] AND [Codes-Offense].[NIBRS_Category] is not null)\
                    OR ([Incident Offenses-GTPD+APD].[SRSOffense] is not null AND LEN([Incident Offenses-GTPD+APD].[SRSOffense]) != 3 AND [Incident Offenses-GTPD+APD].[SRSOffense] = [Codes-Offense].[UCR_CODE1])\
                    OR ([Incident Offenses-GTPD+APD].[SRSOffense] is null AND [Incident Offenses-GTPD+APD].[NIBRSOffense] is not null AND [Incident Offenses-GTPD+APD].[NIBRSOffense] = [Codes-Offense].[NIBRS_Offense_code] AND [Codes-Offense].[NIBRS_Category] is not null)\
                    OR ([Incident Offenses-GTPD+APD].[SRSOffense] is null AND [Incident Offenses-GTPD+APD].[NIBRSOffense] is null AND LEN([Incident Offenses-GTPD+APD].[Offense]) = 3 AND [Incident Offenses-GTPD+APD].[Offense] = [Codes-Offense].[NIBRS_Offense_code] AND [Codes-Offense].[NIBRS_Category] is not null)\
                    OR ([Incident Offenses-GTPD+APD].[SRSOffense] is null AND [Incident Offenses-GTPD+APD].[NIBRSOffense] is null AND LEN([Incident Offenses-GTPD+APD].[Offense]) != 3 AND [Incident Offenses-GTPD+APD].[Offense] = [Codes-Offense].[UCR_CODE1]))\n\
            LEFT JOIN [SS_GARecords_Incident].[dbo].[tblIncidentOffender]\
                ON ( [tblIncidentOffender].[IncidentNumber] = [Incident Offenses-GTPD+APD].[OCA Number] )\n\
        WHERE LEN([OCA Number]) = 8\n\
        ORDER BY [OCA Number] DESC', 1000);
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
        WHERE ([OCA Number]=\'%d\')\
    ', incident_number)
}

module.exports.get_MO = function(incident_number) {
    return sprintf('\
        SELECT [SequenceNumber]\
            , [MO]\n\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentMO]\n\
        WHERE ([IncidentNumber]=\'%d\')\n\
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
        WHERE ([IncidentNumber]=\'%d\')\n\
        ORDER BY [SequenceNumber] ASC\
    ', incident_number)
}

module.exports.get_narrative_APD = function(incident_number) {
    return sprintf('\
        SELECT *\n\
        FROM [CrimeAnalytics].[dbo].[APD Narratives]\n\
        WHERE ([offense_id]=\'%d\')\n\
    ', incident_number)
}

module.exports.get_narrative = function(incident_number) {
    return sprintf('\
        SELECT [Narrative]\n\
        FROM [SS_GARecords_Incident].[dbo].[tblIncident]\n\
        WHERE ([IncidentNumber]=\'%d\')\n\
    ', incident_number)
}

module.exports.get_supplements = function(incident_number) {
    return sprintf('\
        SELECT [SequenceNumber]\
            , [DateEntered]\
            , [OfficerName]\
            , [Narrative] as Text\n\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentSupplement]\n\
        WHERE ([IncidentNumber]=\'%d\' and [Narrative] is not null)\n\
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
        WHERE ([IncidentNumber]=\'%d\')\n\
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
        WHERE ([IncidentNumber]=\'%d\')\n\
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
        WHERE ([IncidentNumber]=\'%d\')\n\
        ORDER BY [SequenceNumber] ASC\
    ', incident_number)
}

module.exports.crimeTypes = 
"SELECT DISTINCT [UCR_Code1],[Inc_Desc_PCase],[NIBRS_Category] FROM [CrimeAnalytics].[dbo].[Codes-Offense]"

module.exports.getBothCount = function(year) {
    return sprintf(
        "SELECT [Report Date]\
        FROM [CrimeAnalytics].[dbo].[Incident Offenses-GTPD+APD]\
        WHERE YEAR([Report Date]) =\'%d'"
        ,year
    )
}
module.exports.getYears = "SELECT DISTINCT YEAR([Report Date]) as [YEAR]\
        FROM [CrimeAnalytics].[dbo].[Incident Offenses-GTPD+APD]\
        ORDER BY YEAR([Report Date]) DESC"

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