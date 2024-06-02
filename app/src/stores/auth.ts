import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import type { Lead } from '@/models/Lead';
import type { Response } from '@/models/Response';
import type { Ruc } from '@/models/Ruc';

const baseUrl = `${import.meta.env.VITE_API_URL}/api`;

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    user: JSON.parse(localStorage.getItem('user')),
    // @ts-ignore
    lead: JSON.parse(localStorage.getItem('lead')),
    // url user is redirected to after login
    returnUrl: null
  }),
  actions: {
    /*async login(username: string, password: string) {
        const user = await fetchWrapper.post(`${baseUrl}/user/authenticate`, { username, password });
        // update pinia state
        this.user = user;
        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        // redirect to previous url or default to home page
        router.push(this.returnUrl || '/dashboard');
    },*/
    logout() {
      this.user = null;
      this.lead = null;
      localStorage.removeItem('user');
      localStorage.removeItem('lead');
      router.push('/auth/login');
    },

    //First page
    async storeLead(lead: Lead): Promise<Response<any>> {
      const response: Response<Lead> = await fetchWrapper.post(`${baseUrl}/lead`, lead)
      //If the response status is false, remove the lead from local storage
      if (!response.status) {
        this.lead = null;
        localStorage.removeItem('lead');
      }else{
        this.lead = response.data;
        localStorage.setItem('lead', JSON.stringify(this.lead));
      }
      return response;
    },
    async verifyOtp(code: string): Promise<Response<any>> {
      return await fetchWrapper.post(`${baseUrl}/verify-code`, {code})
    },
    async sendOtp(phone: string): Promise<Response<any>> {
      return await fetchWrapper.get(`${baseUrl}/send-code?phone=${phone}`)
    },

    //Second page
    async verifyRuc(ruc: string): Promise<Response<Ruc>> {
      return await fetchWrapper.get(`${baseUrl}/ruc/${ruc}`)
    }
  }
});
