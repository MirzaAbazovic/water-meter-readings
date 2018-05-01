export class Settings {
    offlineMode = false ;
    backendProviders = [
        {name: 'VITKOM ',apiUrl:'https://vitkom.ba/api'},
        {name:'KOMBUSOVACA', apiUrl:'https://kombusovaca.com/api'}]
    selectedProvider = this.backendProviders[0]
}