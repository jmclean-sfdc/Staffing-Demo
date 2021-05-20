import { LightningElement, track, wire, api } from "lwc";
import getRecords from "@salesforce/apex/getApplicants.getApplicantRecords";
import cloneApplicants from "@salesforce/apex/cloneApplicants.cloneApplicantRecords";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
//import { getPicklistValues } from 'lightning/uiObjectInfoApi';
//import { getObjectInfo } from 'lightning/uiObjectInfoApi';
//import APPLICANT_OBJECT from '@salesforce/schema/Job_Applicants__c';
//import EDUCATION_FIELD from '@salesforce/schema/Job_Applicant__c.HR_Education__c';

const columns = [];
/*{ label: 'Id', fieldName: 'Id' },*/

export default class SearchApplicant extends LightningElement {

    searchField1 = 'Senior Data Analyst';
    searchLocation = 'Boston, MA';
    searchMiles = '10';
    searchEducation;
    //abc = this.searchMiles;
    connectedCallback() {
      /*this.searchField1 = 'Senior Data Analyst';
      this.searchLocation = 'Boston, MA';
      this.searchMiles = 10;
      */
  }

    /*
    @wire(getObjectInfo, { objectApiName: APPLICANT_OBJECT })
    objectInfo;  

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: EDUCATION_FIELD})
    EducationPicklistValues;
    */
  
   get mileoptions() {
    return [
        { label: '5', value: '5' },
        { label: '10', value: '10' },
        { label: '15', value: '15' },
        { label: '20', value: '20' },
        { label: '25', value: '25' },
        { label: '30', value: '30' }
    ];
}  

  get eduoptions() {
    return [
        { label: 'High School', value: 'High School' },
        { label: 'Technical Training', value: 'Technical Training' },
        { label: 'Degree in Progress - BS', value: 'Degree in Progress - BS' },
        { label: 'Degree in Progress - MS', value: 'Degree in Progress - MS' },
        { label: '2 year college', value: '2 year college' },
        { label: '4 year college', value: '4 year college' },
        { label: 'Masters', value: 'Masters' },
        { label: 'Doctorate', value: 'Doctorate' },
        { label: 'Professional (MD, JD, CPA)', value: 'Professional (MD, JD, CPA)' }
    ];
}

    
  
    columns = columns;
    @track applicantArray = {};
    
    //internalCurrentTitle = this.searchField1;
    handleOnCurrentTitleChange(event) {
      this.searchField1 = event.target.value;
    }

    //internalCurrentMile = this.searchMiles;
    handleMileChange(event){
      
      //this.internalCurrentMile = event.detail.value;
      this.searchMiles =  event.detail.value;
      //this.abc = this.searchMiles;
      //alert('this.searchMiles: '+this.searchMiles);
    }

    //internalCurrentLocation = this.searchLocation;
    handleLocationchange(event) {
      this.searchLocation = event.target.value;
    }

    //internalCurrentEducation;
    handleEducationChange(event){
      
      //this.internalCurrentEducation = event.detail.value;
      this.searchEducation = event.detail.value;
      //alert('this.searchEducation: '+this.searchEducation);
      
    }

    internalManagerExpCheck = false;
    managerExpCheck(event){
      this.internalManagerExpCheck = event.target.checked;
    }
    internalVisaReqdCheck = false;
    visaReqdCheck(event){
      this.internalVisaReqdCheck = event.target.checked;
    }

    internalUSCitizenCheck = false;
    usCitizenCheck(event){
      this.internalUSCitizenCheck = event.target.checked;
    }
  
    handleSearch() {
      console.log("in handle search with title - " + this.searchField1);
      console.log("in handle miles search  - " + this.searchMiles);
      console.log("in handle location search  - " + this.searchLocation);
      console.log("in handle education search  - " + this.searchEducation);
      console.log("in handle manager exp search  - " + this.internalManagerExpCheck);
      console.log("in handle visa reqd search  - " + this.internalVisaReqdCheck);
      console.log("in handle us citizen exp search  - " + this.internalUSCitizenCheck);
      
      var currentTitle = this.searchField1;
      var currLocation = this.searchLocation;
      var currEducation = this.searchEducation;
      var currMiles = this.searchMiles;
      var currManagerExp = this.internalManagerExpCheck;
      var currVisaReqd = this.internalVisaReqdCheck;
      var currUSCitizen = this.internalUSCitizenCheck;
      columns.length = 0;
      
      columns.push({
        label: 'Name',
        fieldName: 'URL',
        type: 'url',
        typeAttributes: { 
                        label: {
                                fieldName: 'Name'
                                }, 
                        target: '_top' 
                        },
        sortable: true
      });

      columns.push({ label: 'Current Title', fieldName: 'Current_Title__c' });

      columns.push({ label: 'Location', fieldName: 'Location__c' });
  
      columns.push({ label: 'Education', fieldName: 'Education__c' });
      
     
     getRecords({
        currentTitle,
        currLocation,
        currEducation,
        currMiles,
        currManagerExp,
        currVisaReqd,
        currUSCitizen
      }).then((result) => {
          result.forEach(function(item) {
            item['URL'] = '/lightning/r/Job_Applicants__c/' + item['Id'] + '/view';
          });
            
          console.log("in getRecords then");
          this.applicantArray = {};
          this.applicantArray = result;
          console.log("result is- " + result);
          console.log("this.applicantArray- " + this.applicantArray);
        })
        .catch((error) => {
          console.log("it errored");
          this.error = error;
          console.log(error);
          this.dispatchEvent(
            new ShowToastEvent({
              title: "ERROR",
              message: error.body.message,
              variant: "error"
            })
          );
        }); 

        
/*
         getRecords({
        currentTitle: internalCurrentTitle, currentMiles: internalCurrentMile
      }).then((result) => {
            
          console.log("in getRecords then");
          this.applicantArray = {};
          this.applicantArray = result;
          console.log("result is- " + result);
          console.log("this.applicantArray- " + this.applicantArray);
        })
        .catch((error) => {
          console.log("it errored");
          this.error = error;
          console.log(error);
          this.dispatchEvent(
            new ShowToastEvent({
              title: "ERROR",
              message: error.body.message,
              variant: "error"
            })
          );
        });
*/
        

        /*
        if(check if applicants have been added){
            this.dispatchEvent(
              new ShowToastEvent({
                title: 'SUCCESS',
                message: 'Applicants Added Successfully',
                variant: "success"
              })
            );
  
          }
        */
     
    }
    
    getApplicantIds(){
      //alert('in getApplicantIds');
      var applicantIdList = [];
      console.log('in getApplicantIds');
      var el = this.template.querySelector('lightning-datatable');
      //alert('after query selector'+el);
      var selected = el.getSelectedRows();
      //alert('before loop'); 
        for (let i = 0; i < selected.length; i++){
          //alert('in row for loop:'+selected[i]);  
          //alert('id:'+ selected[i].Id); 
          applicantIdList.push(selected[i].Id);
            
        }
        //alert('after loop:'+applicantIdList); 
        //console.log('applicantIdList :'+applicantIdList);

        if(applicantIdList.length > 0){
          //alert('list > 0');
          //applicantIds = applicantIdList;
          //alert('applicantIds: '+applicantIds);
          cloneApplicants({applicantIdList
          }).then((result) => {
                //alert('success');
              console.log("in cloneApplicants then");
              console.log("result is- " + result);
             
                this.dispatchEvent(
                  new ShowToastEvent({
                    title: 'SUCCESS',
                    message: 'Applicants Added Successfully',
                    variant: "success"
                  })
                );
      

            })
            .catch((error) => {
              //alert('ERROR');
              console.log("it errored");
              this.error = error;
              console.log(error);
              this.dispatchEvent(
                new ShowToastEvent({
                  title: "ERROR",
                  message: error.body.message,
                  variant: "error"
                })
              );
            }); 

        }

    }

  
    get hasApplicants() {
      if (this.applicantArray.length > 0) {
        return true;
      }
      return false;
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
          title: title,
          message: message,
          variant: variant
        });
        this.dispatchEvent(evt);
      }
  }