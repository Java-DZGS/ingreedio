class RequestUrlBuilder {
    private baseUrl: string;

    private queryParams: { [key: string]: string } = {};

    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }

    setParam(paramName: string, content: string): RequestUrlBuilder {
      this.queryParams[paramName] = content;
      return this;
    }

    build(): string {
      const queryParams = new URLSearchParams(this.queryParams).toString();
      return this.baseUrl + (queryParams ? `?${queryParams}` : '');
    }
}

export default RequestUrlBuilder;
