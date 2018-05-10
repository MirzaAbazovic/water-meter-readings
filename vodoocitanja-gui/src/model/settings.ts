export class Settings {
    offlineMode = false ;
    backendProviders = [
        { name:'LOCALHOST',  apiUrl:'http://localhost:81/api'}
        ];
    selectedProvider = this.backendProviders[0]
}