const sprintf = require('sprintf-js').sprintf;

// TODO: add more methods for common query generation

module.exports.get_query = function() {
    return sprintf("SELECT TOP (%d) [CaseId], [Date], [Time], [Location], [Officer], [Description] FROM [Crime_Report]", 1000);
}

module.exports.locations = 
"SELECT [Building Name],[Loc Type],[St #],[Street-MSAG] FROM [CrimeAnalytics].[dbo].[Codes_Addresses_Unique]"

/* Address Ranking Query configured

DECLARE @START_DATE Date = '10-10-2010';
DECLARE @END_DATE Date = '10-10-2019';


SELECT [Incident Offenses-GTPD+APD].[St Num], [Incident Offenses-GTPD+APD].Street, [Codes-Addresses-Unique].[Building Name], [Codes-Addresses-Unique].[Loc Type], Count([Incident Offenses-GTPD+APD].[OCA Number]) AS [CountOfOCA Number], Min([Incident Offenses-GTPD+APD].[Report Date]) AS [MinOfReport Date], Max([Incident Offenses-GTPD+APD].[Report Date]) AS [MaxOfReport Date]

FROM ([Incident Offenses-GTPD+APD] LEFT JOIN [Codes-Addresses-Unique] ON ([Incident Offenses-GTPD+APD].[St Num] = [Codes-Addresses-Unique].Number) AND ([Incident Offenses-GTPD+APD].Street = [Codes-Addresses-Unique].Street)) LEFT JOIN [Codes-Offense] ON [Incident Offenses-GTPD+APD].SRSOffense = [Codes-Offense].UCR_CODE1


WHERE ((([Incident Offenses-GTPD+APD].[Case Disposition]) Not In ('U','03','NC')) AND (([Codes-Offense].UC2) Between '030' And '070') AND (([Incident Offenses-GTPD+APD].[St Num]) Is Not Null And ([Incident Offenses-GTPD+APD].[St Num])<>'0') AND (([Incident Offenses-GTPD+APD].[Report Date]) Between @START_DATE And @END_DATE) AND (([Incident Offenses-GTPD+APD].[Location Code])<>'APD' Or ([Incident Offenses-GTPD+APD].[Location Code]) Is Null)) OR ((([Incident Offenses-GTPD+APD].[Case Disposition]) Is Null) AND (([Codes-Offense].UC2) Between '030' And '070') AND (([Incident Offenses-GTPD+APD].[St Num]) Is Not Null And ([Incident Offenses-GTPD+APD].[St Num])<>'0') AND (([Incident Offenses-GTPD+APD].[Report Date]) Between @START_DATE And @END_DATE) AND (([Incident Offenses-GTPD+APD].[Location Code])<>'APD' Or ([Incident Offenses-GTPD+APD].[Location Code]) Is Null))


GROUP BY [Incident Offenses-GTPD+APD].[St Num], [Incident Offenses-GTPD+APD].Street, [Codes-Addresses-Unique].[Building Name], [Codes-Addresses-Unique].[Loc Type]

ORDER BY [CountOfOCA Number] DESC;

*/ 