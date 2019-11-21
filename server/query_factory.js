const sprintf = require('sprintf-js').sprintf;

// TODO: add more methods for common query generation

module.exports.get_query = function() {
    return sprintf("SELECT TOP (%d) [CaseId], [Date], [Time], [Location], [Officer], [Description] FROM [CrimeAnalytics].[dbo].[Crime_Report]", 1000);
}

module.exports.locations = 
"SELECT [Building Name],[Loc Type],[St #],[Street-MSAG],[Loc Code] FROM [CrimeAnalytics].[dbo].[Codes_Addresses_Unique]"

module.exports.get_incident_detail = function(incident_number) {
    return sprintf('\
        SELECT [OCA Number]\n\
            , [Case Disposition]\n\
            , [Unit]\n\
            , [Officer Name]\n\
            , [Report Date]\n\
            , [From Date]\n\
            , [From Time]\n\
            , [To Date]\n\
            , [To Time]\n\
            , [Avg Date]\n\
            , [Avg Time]\n\
            , [DTEdit]\n\
            , [Shift]\n\
            , [Video]\n\
            , [VClear]\n\
            , [LType]\n\
            , [Location Code]\n\
            , [Patrol Zone]\n\
            , [Location Landmark]\n\
            , [Address]\n\
            , [Intersection]\n\
            , [Apt-Rm-Ste]\n\
            , [Alcohol]\n\
            , [Drug]\n\
            , [Weapon]\n\
            , [Offense]\n\
            , [NIBRSOffense]\n\
            , [Premises]\n\
            , [Offn From]\n\
            , [UCR Changed]\n\
            , [PType]\n\
            , [UCInc+]\n\
        FROM [CrimeAnalytics].[dbo].[Incident Offenses-GTPD+APD] left join [CrimeAnalytics].[dbo].[Times] on ([Incident Offenses-GTPD+APD].[OCA Number] = [Times].[CASE_NUMBER])\n\
        WHERE ([OCA Number]=\'%d\')\
    ', incident_number)
}

module.exports.get_offense_description = function(incident_number) {
    return sprintf('\
        SELECT [IncidentNumber]\n\
            , [SequenceNumber]\n\
            , [OffenseCode]\n\
            , [AttemptComplete]\n\
            , [OffenseDescription]\n\
            , [Counts]\n\
        FROM [SS_GARecords_Incident].[dbo].[tblIncidentOffense]\n\
        WHERE ([IncidentNumber]=\'%d\')\
    ', incident_number)
}

module.exports.get_narrative = function(incident_number) {
    
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