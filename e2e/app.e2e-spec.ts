import { UpdatedContactsPage } from './app.po';

describe('updated-contacts App', () => {
  let page: UpdatedContactsPage;

  beforeEach(() => {
    page = new UpdatedContactsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
