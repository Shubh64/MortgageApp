import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import './ajax-call.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/app-route/app-location.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@polymer/gold-cc-input/gold-cc-input.js';
import '@polymer/gold-cc-expiration-input/gold-cc-expiration-input.js';
import '@polymer/gold-cc-cvc-input/gold-cc-cvc-input.js';

/**
 * @customElement
 * @polymer
 */
class PaymentPage extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
    }
  .proceed-btn, paper-button {
    margin-top:10px;
      margin-bottom: 10px;
      background-color: darkblue;
      color: whitesmoke;
      cursor: pointer;
      font-size: 16px;
      border-radius: 6px;
      height:30px;
  }
  .proceed-btn a {
      text-decoration: none;
      color: #fff;
  }
  #cardDetails{
    background: #eee9f0;
  }
div
  {
 background:white;
 width:40%;
 margin:auto;
 padding:15px;
}
span{
 display:flex;
 margin-top: 10px;
 justify-content: center;
}
h2{
  color:green;
}
#donationDetails{
  width:500px;
  height:420px;
}
a{
  text-decoration:none
}
  </style>
  <app-location route={{route}}></app-location>
  <ajax-call id="ajax"></ajax-call>
    <div id="cardDetails">
    <h3>Enter Card Details</h3>
            <!-- Card Number -->
            <gold-cc-input auto-validate id="card" label="Card number" error-message="Enter valid visa or mastercard!" card-types='["visa", "mastercard"]' required>
        </gold-cc-input>
            <!-- Date Field -->
            <gold-cc-expiration-input></gold-cc-expiration-input>
  
            <!-- Card Verification Field -->
            <gold-cc-cvc-input card-type="[[cardType]]"></gold-cc-cvc-input>
          </div>
    <span> <paper-button type="submit"  on-click="_handleSubmit" raised class="proceed-btn">Proceed</paper-button>
    </span> 
  <paper-dialog id="modal">
  <paper-dialog-scrollable>
  <form id="donationDetails">
  <h2>ThankYou for giving Wings to some Dreams</h2>
  <h3>Your Donation Details are:</h3>
  <ul>
      <li>Donar Name:{{userName}}</li>
      <li>Scheme Name:{{schemeName}}</li>
      <li>Scheme Amount:{{schemeAmount}}</li>
      <li>Email-Id:{{emailId}}</li>
      <li>MobileNo.:{{mobileNumber}}</li>
      <li>PAN Card No.:{{panNumber}}</li>
      <li>TaxBenefitAmount:{{taxBenefitAmount}}</li>
  </ul>
  </form>
  </paper-dialog-scrollable>
  <paper-button raised dialog-dismiss>Cancel</paper-button>
  <a href="http://10.117.189.176:9090/udaan/users/{{userId}}/email"><paper-button  raised >Send Email</paper-button></a>
  <a href="http://10.117.189.176:9090/udaan/users/{{userId}}/download" download="payment details.pdf"><paper-button  raised >Download</paper-button></a>
</paper-dialog>
    `;
  }
  static get properties() {
    return {
      schemeName:String,
      schemeAmount:String,
      userName:String,
      emailId:String,
      mobileNumber:String,
      panNumber:String,
      taxBenefitAmount:String,
      statusCode:String,
      userId:Number,
      postObj:{
        type:Object,
        value:{}
      }
      };
    }
    _handleSubmit(){
      this.postObj= JSON.parse(sessionStorage.getItem('donorDetails'))
      this.postObj.creditCardNumber=this.$.card.value;
      console.log(this.postObj);
      this.$.ajax._makeAjaxCall('post', `${baseUrl}/udaan/users`, this.postObj, 'ajaxResponse')

    }
    ready() {
      super.ready();
      this.addEventListener('ajax-response', (e) => this._payments(e))
    }
    _payments(event){
      console.log(event.detail.data)
        this.schemeName=event.detail.data.schemeName;
        this.schemeAmount=event.detail.data.schemeAmount
        this.userName=event.detail.data.userName
        this.emailId=event.detail.data.emailId
        this.mobileNumber=event.detail.data.mobileNumber
        this.panNumber=event.detail.data.panNumber
        this.taxBenefitAmount=event.detail.data.taxBenefit
        this.userId=event.detail.data.userId
       this.$.modal.open();
    }

  }

window.customElements.define('payment-page', PaymentPage);