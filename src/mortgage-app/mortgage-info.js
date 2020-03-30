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
class MatrimonyInfo extends PolymerElement {
static get template() {
return html`
<style>
  :host {
    display: block;
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
        <paper-input class="custom" always-float-label label="Mobile Number" id="mobileNo" required type="number"
        maxlength="10" error-message="Please Enter Mobile No."></paper-input>
        <paper-input class="custom" always-float-label id="pan" pattern="[a-zA-Z0-9]*" label="PAN no." required type="text"></paper-input>
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
      <paper-input class="custom" always-float-label id="pan" pattern="[a-zA-Z0-9]*" label="PAN no." required type="text"></paper-input>
        <paper-input class="custom" always-float-label label="PropertyType" id="propertyType" required pattern="[a-zA-Z]*">
        </paper-input>
        <paper-input class="custom" always-float-label label="Property Value" id="propertyValue" required pattern="[0-9]*">
        </paper-input>
        <paper-input class="custom" always-float-label label="Initial Deposit" id="initialDeposit" required pattern="[0-9]*">
        </paper-input>
        <paper-input class="custom" always-float-label label="Tenure" id="tenure" required pattern="[0-9]*">
        </paper-input>
        <paper-button raised on-click=_checkEligibility>Check Eligibility</paper-button>
      </form>
    </div>
  </iron-pages>
</iron-form>
`;
}
static get properties()
{
  return{
    selected:{
      type:Boolean
    }
  }
}
ready()
{
  super.ready()
  this.addEventListener('Existing-User',event=>{
    let data=event.detail.data;
    let mobileNo=this.$.mobileNo.value;
    if(data.length!=0)
    {
      alert("user already exist")
    }
    else{
      console.log(this.$.gender.selected)
      
      ajax._makeAjax(`http://localhost:3000/users`,"post",postObj,false,'')
      this.dispatchEvent(new CustomEvent('Refresh-Home',{bubbles:true,composed:true}))
    }
  })
}
connectedCallback()
{
  super.connectedCallback();
  this.selected=0;
}
_next()
{
  this.selected=1;
  console.log(this.$.dob.value)
}
_nextApi()
{
  this.selected=2;
}
_checkEligibility()
{
  let userName=this.$.userName.value;
  let emailId=this.$.email.value;
  let address=this.$.address.value;
  let occupation=this.$.occupation.value;
  let dob=this.$.dob.value;
  let mobileNumber=this.$.mobileNumber.value;
  let panCard=this.$.panCard.value;
  let income=this.$.income.value;
  let postObj={userName,income,emailId,address,occupation,dob,gender,mobileNumber,panCard,dob}
  // this.$.ajax._makeAjaxCall("get",`http://localhost:3000/users?mobileNo=${mobileNo}`,postObj,'ajaxResponse')
}
}

window.customElements.define('mortgage-info', MatrimonyInfo);