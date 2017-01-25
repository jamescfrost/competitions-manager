import { CompetitionsManagerPage } from './app.po';

describe('competitions-manager App', function() {
  let page: CompetitionsManagerPage;

  beforeEach(() => {
    page = new CompetitionsManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
