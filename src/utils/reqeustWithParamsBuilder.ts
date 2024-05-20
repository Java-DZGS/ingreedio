class RequestWithParamsBuilder {
    private baseUrl: string;

    private queryParams: { [key: string]: string } = {};

    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }

    setParam(paramName: string, content: string): void {
      this.queryParams[paramName] = content;
    }

    build(): string {
      const queryParams = new URLSearchParams(this.queryParams).toString();
      return this.baseUrl + (queryParams ? `?${queryParams}` : '');
    }
}

export default RequestWithParamsBuilder;
