import config from 'config'

class AppConfiguration {
    baseUrl: string
    cucumberTimeout: number

    constructor() {
        this.baseUrl = config.get("baseUrl")
        this.cucumberTimeout = config.get("cucumberTimeout")
    }
}

export default new AppConfiguration()