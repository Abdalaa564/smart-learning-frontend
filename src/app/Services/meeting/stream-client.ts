import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StreamVideoClient } from '@stream-io/video-client';

@Injectable({
  providedIn: 'root',
})
export class StreamClient {
  private client?: any; // StreamVideoClient
  private currentCall: any | undefined;

  // --- DEV tokens only (temporary) ---
  // إذا عندك dev token واحد من Stream Dashboard ضع هنا مؤقتاً
  // أو يمكنك توليد dev token client-side إذا الوثائق تدعم ذلك.
  private DEV_TOKEN?: string = undefined;
  
  constructor(private http: HttpClient) {}
  
  getCurrentCall() {
    return this.currentCall;
  }
  
  // init with tokenProvider (recommended). For quick dev: pass developer token
  async initWithDevToken(apiKey: string, userId: string, userName?: string) {
    if (!apiKey) throw new Error('API key required');
    // If you have a dev token you can pass it (unsafe for production)
    // Stream client constructor accepts tokenProvider or token string in some versions.
    // We'll create the client with a tokenProvider that returns a dev token (for testing).
    this.client = new StreamVideoClient({
      apiKey,
      user: { id: userId, name: userName || userId },
      // tokenProvider: async () => this.DEV_TOKEN || (await this.fetchTokenFromServer(userId)),
      // Many Stream client versions accept tokenProvider callback; if not, pass token directly.
      // For dev quickstart set DEV_TOKEN on this class or call initWithDevToken with token param.
    } as any);

    // If your client requires a token immediately, you can set DEV_TOKEN and then
    // call client.connectUser? (depends on SDK). We'll rely on call.join later.
  }

  // production: fetch token from backend
  async initFromServer(apiKey: string, userId: string, callId: string) {
    if (!apiKey) throw new Error('API key required');
    this.client = new StreamVideoClient({
      apiKey,
      user: { id: userId },
      tokenProvider: async () => {
        // call backend endpoint that generates a user token for Stream
        const resp: any = await this.http.get(`http://localhost:5163/api/stream/token?userId=${userId}&callId=${callId}`).toPromise();
        return resp?.token;
      }
    } as any);
  }

  // create/return call object (doesn't join)
  call(callType: string, callId: string) {
    if (!this.client) throw new Error('Stream client not initialized');
    this.currentCall = this.client.call(callType, callId);
    return this.currentCall;
  }

  // getOrCreate then join
  async createAndJoin(callType: string, callId: string, createOptions?: any, micOn = true, camOn = true) {
    if (!this.currentCall) this.call(callType, callId);
    await this.currentCall.getOrCreate({ data: createOptions });
    if (camOn) await this.currentCall.camera.enable(); else await this.currentCall.camera.disable();
    if (micOn) await this.currentCall.microphone.enable(); else await this.currentCall.microphone.disable();
    await this.currentCall.join();
    return this.currentCall;
  }

  async join(callType: string, callId: string, micOn = true, camOn = true) {
    if (!this.currentCall) this.call(callType, callId);

    if (camOn) await this.currentCall.camera.enable();
    else await this.currentCall.camera.disable();

    if (micOn) await this.currentCall.microphone.enable();
    else await this.currentCall.microphone.disable();

    await this.currentCall.join();

    return this.currentCall;
  }

  async leave() {
    if (!this.currentCall) return;
    await this.currentCall.leave();
    this.currentCall = undefined;
  }

  async endCall() {
    if (!this.currentCall) return;
    await this.currentCall.endCall();
    this.currentCall = undefined;
  }

  // preview: attach a video preview into an element
  async attachPreview(element: HTMLElement) {
    if (!this.currentCall) throw new Error('Call not created for preview');

    try {
      // Enable camera for preview (temporary stream)
      await this.currentCall.camera.enable();

      element.innerHTML = '';

      // Stream SDK built-in preview
      const preview = await this.currentCall.camera.createPreview(element);

      return { stream: preview.stream, videoEl: preview.element };
    } catch (err) {
      console.error('Preview failed', err);
      throw err;
    }
  }
}