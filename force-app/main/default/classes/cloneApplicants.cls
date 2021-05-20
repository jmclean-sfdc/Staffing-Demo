public with sharing class cloneApplicants {
    @AuraEnabled
    public static string cloneApplicantRecords(List<String> applicantIdList){
        System.debug('in cloneApplicantRecords');
        System.debug('applicantIdList: '+applicantIdList);
        List<Job_Applicants__c> applicantListToInsert = new List<Job_Applicants__c>();
        List<Job_Applicants__c> applicantListToUpdate = new List<Job_Applicants__c>();
        for(Job_Applicants__c applicantRecord : [SELECT ID FROM Job_Applicants__c WHERE Id IN :applicantIdList ]){
                Job_Applicants__c cloneREcord = applicantRecord.clone(false,false,false,true);
                applicantListToInsert.add(cloneREcord);
                Job_Applicants__c updateRecord = new Job_Applicants__c(ID = applicantRecord.id);
                applicantListToUpdate.add(updateRecord);
        }
        if(applicantListToInsert.size() > 0){
            insert applicantListToInsert;
        }
        if(applicantListToUpdate.size() > 0){
            update applicantListToUpdate;
        }
        return 'success';
    }    
    
}