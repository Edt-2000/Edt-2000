import {EdtVidtPage} from "./app.po";

describe('edt-vidt App', () => {
  let page: EdtVidtPage;

  beforeEach(() => {
    page = new EdtVidtPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
