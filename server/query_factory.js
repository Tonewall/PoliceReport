const sprintf = require('sprintf-js').sprintf;

// TODO: add more methods for common query generation

module.exports.get_query = function() {
    return sprintf("SELECT TOP (%d) [CaseId], [Date], [Time], [Location], [Officer], [Description] FROM [CrimeAnalytics].[dbo].[Crime_Report]", 1000);
}

module.exports.locations = 
"SELECT [Building Name],[Loc Type],[St #],[Street-MSAG],[Loc Code] FROM [CrimeAnalytics].[dbo].[Codes_Addresses_Unique]"

module.exports.get_incident_detail = function(incident_number) {
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
            , [UCInc+]\n\
        FROM [CrimeAnalytics].[dbo].[Incident Offenses-GTPD+APD] left join [CrimeAnalytics].[dbo].[Times] on ([Incident Offenses-GTPD+APD].[OCA Number] = [Times].[CASE_NUMBER])\n\
        WHERE ([OCA Number]=\'%d\')\
    ', incident_number)
}

module.exports.get_offense_description = function(incident_number) {
    return sprintf('\
        SELECT [IncidentNumber]\
            , [SequenceNumber]\
            , [OffenseCode]\
            , [AttemptComplete]\
            , [OffenseDescription]\
            , [Counts]\n\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentOffense]\n\
        WHERE ([IncidentNumber]=\'%d\')\n\
        ORDER BY [SequenceNumber] ASC\
    ', incident_number)
}

module.exports.get_narrative = function(incident_number) {
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

module.exports.get_arreest_info = function(incident_number) {
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