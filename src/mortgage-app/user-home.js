import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import './ajax-call.js';

/**
 * @customElement
 * @polymer
 */
class UserHome extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <ajax-call id="ajax"></ajax-call>
      <h3>Welcome User,{{userName}}</h3>
      <div>
      <h3>CustomerId : {{customerId}}</h3>
      <h3>savingsAccountNumber : {{savingsAccountNumber}}</h3>
      <h3>MortgageAccountNumber : {{mortgageAccountNumber}}</h3>
      <h3>SavingsAccountBalance : {{savingsAccountBalance}}</h3>
      <h3>MortgageAccountBalance : {{mortgageAccountBalance}}</h3>
      <h3>EMI per month : {{emi}}</h3>
      </div>
    `;
    }
    static get properties() {
        return {
            userName: String,
            accountDetails: {
                type: Object,
                value: {}
            }
        };
    }
    /**
    * listening customEvents sent from child elements
    */
    /** 
     * call the API to fetch the data to render it on the screen
     */
    connectedCallback() {
        super.connectedCallback();
        let userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
        console.log(userDetails)
        this.savingsAccountNumber=userDetails.savingsAccountNumber
        this.mortgageAccountNumber=userDetails.mortgageAccountNumber
        this.savingsAccountBalance=userDetails.savingsAccountBalance
        this.mortgageAccountBalance=userDetails.mortgageAccountBalance
        this.customerId=userDetails.customerId
        this.emi=userDetails.emi
    }
}

window.customElements.define('user-home', UserHome);