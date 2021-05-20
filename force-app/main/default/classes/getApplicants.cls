public with sharing class getApplicants {
    @AuraEnabled
    public static List<SObject> getApplicantRecords(String currentTitle,
                                                    String currLocation, 
                                                    String currEducation, 
                                                    String currMiles,
                                                    Boolean currManagerExp, 
                                                    Boolean currVisaReqd, 
                                                    Boolean currUSCitizen){
                                                        //Decimal currMiles,
system.debug('in getApplicantRecords');
system.debug('currentTitle :'+currentTitle);
system.debug('currLocation :'+currLocation);
system.debug('currEducation :'+currEducation);
system.debug('currMiles :'+currMiles);
system.debug('currManagerExp :'+currManagerExp);
system.debug('currVisaReqd :'+currVisaReqd);
system.debug('currUSCitizen :'+currUSCitizen);

String whereClause = ' WHERE ';

if(!String.isEmpty(currentTitle)){
    whereClause = whereClause + ' Current_Title__c = ' + '\'' + currentTitle + '\''  + ' AND ';
}

if(!String.isEmpty(currLocation)){
    whereClause = whereClause + ' Current_Location__c = ' + '\'' + currLocation + '\''  + ' AND ';
}

if(!String.isEmpty(currEducation)){
    whereClause = whereClause + ' Education__c = ' + '\'' + currEducation + '\''  + ' AND ';
}

if(currManagerExp){
    whereClause = whereClause + ' Manager_Experience__c = '  + currManagerExp  + ' AND ';
}

if(currVisaReqd){
    whereClause = whereClause + ' Visa_Required__c = ' +  currVisaReqd  + ' AND ';
}


if(!String.isEmpty(currMiles)){
    whereClause = whereClause + ' Miles_From_Location__c <= '  + currMiles  + ' AND ';
}

whereClause = whereClause.removeEnd(' AND ');
String queryString = '';
if(whereClause == ' WHERE '){
    //display all records
    queryString = 'SELECT Name, candidate__r,Current_Title__c, Current_Location__c, Education__c  FROM Job_Applicants__c ';
}else{
    //display results based on filters
    queryString = 'SELECT Name,candidate__r, Current_Title__c, Current_Location__c, Education__c  FROM Job_Applicants__c ' + whereClause;
}




system.debug('queryString is: '+queryString);
List<SObject> results = Database.query(queryString);
System.debug('search results: '+results);
return results;


}
}