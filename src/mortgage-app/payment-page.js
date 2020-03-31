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
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
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
    <paper-dropdown-menu id="payment" name="payment" vertical-offset="60">
    <paper-listbox slot="dropdown-content" class="dropdown-content" selected=0>
      <paper-item>Select Payment Type</paper-item>
      <paper-item>normal</paper-item>
      <paper-item>auto</paper-item>
    </paper-listbox>
  </paper-dropdown-menu>
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
  
    `;
  }
  static get properties() {
    return {

      };
    }
    _handleSubmit(){
      let {customerId,emi}= JSON.parse(sessionStorage.getItem('userDetails'))
      let paymentType=this.$.payment.value;
      let postObj={paymentType,emi}
      this.$.ajax._makeAjaxCall('PUT', `http://localhost:4242/mortgage/payment?customerId=${customerId}`,postObj, 'ajaxResponse')
      console.log(postObj)
    }
    ready() {
      super.ready();
      this.addEventListener('ajax-response', (e) => this._payments(e))
    }
    _payments(event){
      console.log(event.detail.data.statusCode);
      if(event.detail.data.statusCode==902)
      {
        this.message="payment Successfull";
        this.$.toast.open();
      }
      else{
        this.message="payment failed";
        this.$.toast.open();
      }
    }

  }

window.customElements.define('payment-page', PaymentPage);