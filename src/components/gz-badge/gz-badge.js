import cssData from './gz-badge.css';
import imageData from './gz_badge.svg';
import twImage from './twitter-brands.svg';
import fbImage from './facebook-brands.svg';
import ghImage from './github-brands.svg';
import cpImage from './codepen-brands.svg';

window.customElements.define('gz-badge', class extends HTMLElement {
  
    constructor(){
      super();
      let shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.innerHTML = this.render();
    }

    get drawer() {
      return this.getAttribute('drawer');
    }
    
    set drawer(newValue) {
      this.setAttribute('drawer', newValue);
    }

    static get observedAttributes() {
      return ['drawer'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case 'drawer':
          if(newValue === 'open')
            this.shadowRoot.querySelector('#gzlink').classList.add('drawer-open');
          else
            this.shadowRoot.querySelector('#gzlink').classList.remove('drawer-open');
          break;
      }
    }
    
    connectedCallback() {
      console.log('%c\u03B6'+'%ca GreenZeta Production', 
              'font-family:serif; font-size:12px; color: white; font-weight: bold; background-color: #7bb951; padding: 4px 10px;', 
              'color: white; font-size:12px; background-color: #2a2a2a; padding: 4px 10px;', 
              'http://greenzeta.com');

      this.addEventListener('click', function(e) {
        console.log('Active element (inside shadow dom):', this.shadowRoot.activeElement);
        if(this.drawer === 'open')
          this.drawer = '';
        else
          this.drawer = 'open';
      });
    }
    
    render(){
      return `
        <style>
          ${cssData}
        </style>
        
        <div id="gzlink">
          <div class="drawer">
            <h1>FIND OUT MORE!</h1>
            <p>
              GreenZeta apps are all about experimenting with the latest web technologies. 
              Click on the links below to get the lates updates on social media. Head over 
              to <a href="https://www.greenzeta.com/?utm_source=gz-badge" target="_blank">GreenZeta.com</a> 
              to see all the projects with updates, screen shots and more.
            </p>
            <a class="tw icon" href="http://twitter.com/greenzeta" target="_blank">${twImage}</a>
            <a class="fb icon" href="http://www.facebook.com/greenzeta" target="_blank">${fbImage}</a>
            <a class="gh icon" href="https://github.com/mwilber" target="_blank">${ghImage}</a>
            <a class="cp icon" href="https://codepen.io/mwilber/" target="_blank">${cpImage}</a>
            <a class="ws" href="https://www.greenzeta.com/?utm_source=gz-badge" target="_blank"><span>GreenZeta.com</span></a>
          </div>
          ${imageData}
        </div>
      `;
    }
});