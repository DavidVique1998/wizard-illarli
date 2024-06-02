import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueTablerIcons from 'vue-tabler-icons';
import VueApexCharts from 'vue3-apexcharts';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

// google-fonts
import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/500.css';
import '@fontsource/public-sans/600.css';
import '@fontsource/public-sans/700.css';

//Mock Api data
import { fakeBackend } from '@/utils/helpers/fake-backend';

//i18
import { createI18n } from 'vue-i18n';
import messages from '@/utils/locales/messages';

//Toast
import Toast from 'vue-toastification';
import type { PluginOptions } from 'vue-toastification';
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const i18n = createI18n({
  locale: 'en',
  messages: messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true
});

const options: PluginOptions = {
  // Timeout in milliseconds
  timeout: 5000,
  // Whether to show the close button
  hideProgressBar: false,
  
  // Whether to pause the toast when hovered
  pauseOnHover: true,
  
  // Whether to pause the toast when the window is not focused
  pauseOnFocusLoss: true,
  
  // Whether to close the toast when clicked
  closeOnClick: true,
  
  // Draggable and the drag-to-close percentage (in px)
  draggable: true,
  draggablePercent: 0.6,
  
  // Animation classes for the toast
  transition: 'Vue-Toastification__bounce',
  
  // Show the newest toast at the top of the list
  newestOnTop: true,
  
  // Define default classes for the toast container
  toastClassName: 'my-custom-toast-class',
  
  // Define custom classes for the toast body
  bodyClassName: ['my-custom-body-class'],
  
  // Enable/disable the close button
  showCloseButtonOnHover: false,
  
  // Close button HTML content
  closeButton: 'button', // You can provide a custom component as well
  
  // Icon for the toast, false to disable
  icon: true,
};

const app = createApp(App);
fakeBackend();
app.use(router);
app.use(PerfectScrollbar);
app.use(createPinia());
app.use(VueTablerIcons);
app.use(Antd);
app.use(i18n);
app.use(Toast, options);
app.use(VueApexCharts);
app.use(vuetify).mount('#app');
