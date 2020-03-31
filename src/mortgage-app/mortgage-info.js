import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js'
import './ajax-call.js'
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@polymer/app-route/app-location.js';
import '@polymer/paper-toast/paper-toast.js';

class MortgageInfo extends PolymerElement {
static get template() {
return html`
<style>
  :host {
    display: block;
  }
  #dialog{
    width:50%;
    border-radius:20px;
  }
  #dialog2{
    width:50%;
    border-radius:20px;
  }
  paper-input.custom {
    margin-bottom: 14px;
    --primary-text-color: #01579B;
    --paper-input-container-color: black;
    --paper-input-container-focus-color: black;
    --paper-input-container-invalid-color: black;
    border: 1px solid #BDBDBD;
    border-radius: 5px;
    /* Reset some defaults */
    --paper-input-container: {
      padding: 0;
    }
    ;
    --paper-input-container-underline: {
      display: none;
      height: 0;
    }
    ;
    --paper-input-container-underline-focus: {
      display: none;
    }
    ;
    /* New custom styles */
    --paper-input-container-input: {
      box-sizing: border-box;
      font-size: inherit;
      padding: 4px;
    }
    ;
    --paper-input-container-input-focus: {
      background: rgba(0, 0, 0, 0.1);
    }
    ;
    --paper-input-container-input-invalid: {
      background: rgba(255, 0, 0, 0.3);
    }
    ;
    --paper-input-container-label: {
      top: -8px;
      left: 4px;
      background: white;
      padding: 2px;
      font-weight: bold;
    }
    ;
    --paper-input-container-label-floating: {
      width: auto;
    }
    ;
  }
  form {
    width: 500px;
    border: 2px solid grey;
    margin: 0px auto;
    padding: 20px;
    border-radius : 5px;
    background:#f5f6ff;
  }
  paper-button {
    margin-top: 20px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    background-color: #667db6;
    color:white;
  }
  vaadin-date-picker{
    display:inline;
  }
  paper-tabs {
    --paper-tabs-selection-bar-color: black;
  }
  iron-icon {
    margin-right: 10px;
  }
  iron-pages {
    margin-top: 20px;
  }
</style>
<paper-toast text={{message3}} id="toast"></paper-toast>
<app-location route={{route}}></app-location>
<ajax-call id="ajax"></ajax-call>
<iron-form id="form">
  <paper-tabs selected={{selected}}>
    <paper-tab>Personal Details</paper-tab>
    <paper-tab>Occupational Details</paper-tab>
    <paper-tab>Property Details</paper-tab>
    </paper-tabs>
  <iron-pages selected={{selected}}>
    <div>
      <form>
        <paper-input class="custom" always-float-label label="Name" id="userName" required pattern="[a-zA-Z]*">
        </paper-input>
        <paper-radio-group selected="Male" id="gender">
          <label for="Gender">Gender</label>
          <paper-radio-button name="Male">Male</paper-radio-button>
          <paper-radio-button name="Female">Female</paper-radio-button>
        </paper-radio-group>
        <vaadin-date-picker class="custom" always-float-label id="dob" label="DOB" required></vaadin-date-picker>
        <paper-input class="custom" always-float-label id="email" label="Email" required
        pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"></paper-input>
        <paper-input class="custom" always-float-label label="Mobile Number" id="mobileNumber" required type="number"
        maxlength="10" error-message="Please Enter Mobile No."></paper-input>
        <paper-input class="custom" always-float-label id="panCard" pattern="[a-zA-Z0-9]*" label="PAN no." required type="text"></paper-input>
        <paper-input class="custom" always-float-label id="address" pattern="[a-zA-Z0-9]*" label="Address" required type="text"></paper-input>
        <paper-button raised on-click="_next">Next</paper-button>
      </form>
    </div>
    <div>
      <form>
        <paper-input class="custom" always-float-label label="Occupation" id="occupation" required pattern="[a-zA-Z]*">
        </paper-input>
        <paper-input class="custom" always-float-label label="Monthly Income" id="income" required pattern="[0-9]*">
        </paper-input>
        <paper-button raised on-click=_nextApi>Next</paper-button>
      </form>
    </div>
    <div>
      <form>
      <paper-input class="custom" always-float-label id="panCard1" pattern="[a-zA-Z0-9]*" label="PAN no." required type="text"></paper-input>
        <paper-input class="custom" always-float-label label="PropertyType" id="propertyType" required pattern="[a-zA-Z]*">
        </paper-input>
        <paper-input class="custom" always-float-label label="Property Value" id="propertyValue" required pattern="[0-9]*">
        </paper-input>
        <paper-input class="custom" always-float-label label="Initial Deposit" id="initialDeposit" required pattern="[0-9]*">
        </paper-input>
        <paper-input class="custom" always-float-label label="Tenure" id="tenure" required pattern="[0-9]*">
        </paper-input>
        <paper-dropdown-menu id="payment" name="payment" vertical-offset="60">
        <paper-listbox slot="dropdown-content" class="dropdown-content" selected=0>
          <paper-item>Select Payment Type</paper-item>
          <paper-item>normal</paper-item>
          <paper-item>auto</paper-item>
        </paper-listbox>
      </paper-dropdown-menu>
        <paper-button raised on-click=_checkEligibility>Check Eligibility</paper-button>
      </form>
    </div>
  </iron-pages>
</iron-form>
<paper-dialog id="dialog">
<paper-dialog-scrollable>
<template is="dom-if" if="[[eligible]]">
<h2> {{message}}</h2>
<h2>EMI per Month: {{emi}}</h2>
  <paper-button type="submit" id="apply" on-click="_handleApply">Apply</paper-button>
  <paper-button type="cancel" dialog-dismiss>Cancel</paper-button>
  </template> 
  <template is="dom-if" if="[[eligible1]]">
  <h2> {{message1}}</h2>
  </template>
  </paper-dialog-scrollable>
</paper-dialog>
this content must be  hidden
</template> 
<paper-dialog id="dialog2">
<paper-dialog-scrollable>  
<h2> {{message2}}</h2>
<h3>CustomerId : {{customerId}}</h3>
<h3>Password : {{password}}</h3>
<h3>SavingsAccountNumber : {{savingsAccountNumber}}</h3>
<h3>SavingsAccountBalance : {{savingsAccountBalance}}</h3>
<h3>MortgageAccountNumber : {{mortgageAccountNumber}}</h3>
<h3>MortgageAccountBalance : {{mortgageAccountBalance}}</h3>
<h3>EMI per month : {{emi}}</h3>
  <paper-button type="login" id="login" on-click="_handleLogin">Login</paper-button>
  </paper-dialog-scrollable>
</paper-dialog>
`;
}
static get properties()
{
  return{
    selected:{
      type:Boolean
    },
    eligible:{
      type:Boolean,
      value:false
    },
    eligible1:{
      type:Boolean,
      value:false
    }
  }
}
ready()
{
  super.ready()
  this.addEventListener('ajax-response',(e)=>this._ajaxResponse(e))
  this.addEventListener('check-eligibility',(e)=>this._eligibility(e))
}
connectedCallback()
{
  super.connectedCallback();
  this.selected=0;
}
_next()
{
  let currentDate=new Date();
  let currentDay=currentDate.getDate();
  let currentMonth=currentDate.getMonth()+1;
  let currentYear=currentDate.getFullYear();
  let dob = this.$.dob.value;
  let dobYear = parseInt(dob.slice(0,4));
  let dobDay = parseInt(dob.slice(5,7));
  let dobMonth = parseInt(dob.slice(8,10));
  console.log(dob,currentDay,currentMonth,currentYear,dobDay,dobMonth,dobYear)
  console.log(this.$.dob.value)
  let age=currentYear-dobYear;
  var m = currentMonth - dobMonth;
  if (m < 0 || (m === 0 && currentDay < dobDay)) {
      age--;
  }
  if(age<21)
  {
      this.message3='Age Should be age Greater than 21';
      this.$.toast.open();
  }
  else
  {
    this.selected=1;
  }
}
_nextApi()
{

    let dob = this.$.dob.value;
    let userName=this.$.userName.value;
    let emailId=this.$.email.value;
    let address=this.$.address.value;
    let occupation=this.$.occupation.value;
    let mobileNumber=this.$.mobileNumber.value;
    this.panCard=this.$.panCard.value;
    let income=this.$.income.value;
    let postObj={userName,income,emailId,address,occupation,dob,mobileNumber,panCard:this.panCard,dob}
    console.log(postObj)
    this.$.ajax._makeAjaxCall("POST",`http://localhost:4242/mortgage/users`,postObj,'null')
    this.selected=2;
  }
 
_checkEligibility(){
let propertyType=this.$.propertyType.value;
let propertyValue=this.$.propertyValue.value;
let initialDeposit=this.$.initialDeposit.value;
this.panCard1=this.$.panCard1.value;
let tenure=this.$.tenure.value;
let postObj={propertyType,panCard:this.panCard1,propertyValue,initialDeposit,tenure};
console.log(postObj)
this.$.ajax._makeAjaxCall("post",`http://localhost:4242/mortgage/property`,postObj,'checkEligibility')
  this.$.dialog.open();
 

}
_handleApply(){
let postObj={panCard:this.panCard1,paymentType:"normal"};
console.log(postObj)
this.$.ajax._makeAjaxCall("post",`http://localhost:4242/mortgage/apply`,postObj,'ajaxResponse')
  this.$.dialog2.open();
}
_ajaxResponse(event){
  console.log(event.detail.data)
  this.message2="Your Details for the mortgage are"
  this.customerId=event.detail.data.customerId
  this.password=event.detail.data.password
  this.savingsAccountNumber=event.detail.data.savingsAccountNumber
  this.mortgageAccountNumber=event.detail.data.mortgageAccountNumber
  this.savingsAccountBalance=event.detail.data.savingsAccountBalance
  this.mortgageAccountBalance=event.detail.data.mortgageAccountBalance
  this.emi=event.detail.data.emi;
}
_eligibility(event){
  console.log(event.detail.data)
  console.log("12345")
  if(event.detail.data.statusCode==605){
    this.eligible=true
    this.message="You are Eligible with"
    // this.mortgageAmount=parseInt(this.$.propertyType.value)-parseInt(this.$.initialDeposit.value);
    // console.log(mortgageAmount)
    this.emi=event.detail.data.emi
  }
  else{
    this.eligible1=true
    this.message1="You are Not Eligible for the loan"
  }
}
_handleLogin(){
  this.set('route.path','/login')
}
}

window.customElements.define('mortgage-info', MortgageInfo);