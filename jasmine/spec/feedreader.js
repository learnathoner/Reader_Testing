/*jshint esversion: 6 */

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {

  // Testing the allFeeds array
  describe('RSS Feeds', function() {

      // Make sure allFeeds array is not empty
      it('are defined', function() {
          expect(allFeeds).toBeDefined();
          expect(allFeeds.length).not.toBe(0);
      });

      // Loops through feeds in array, makes sure they all have url
      it('has url', function() {
         for (const feed of allFeeds) {
           expect(feed.url).toBeDefined();
           expect(feed.url.length).not.toBe(0);
         }
       });

       // Tests every feed in array has name
       it('has name', function() {
         for (const feed of allFeeds) {
           expect(feed.name).toBeDefined();
           expect(feed.name.length).not.toBe(0);
         }
       });
  });

  // Tests menu
  describe('The Menu', function() {

    //TODO: Should var be in a "beforeEach" or okay like this?
    const menu = $('body').get(0);
    const menuIcon = $('.menu-icon-link');

    // Tests if body class is 'menu-hidden' by default
    it('is hidden default', function() {
       expect(menu).toHaveClass('menu-hidden');
    });

    // Tests if hidden status toggled on click
    it('toggles hidden on click', function() {

      // Toggle click on menu icon, expect menu-hidden to be gone
      menuIcon.trigger('click');
      expect(menu).not.toHaveClass('menu-hidden');

      // Toggle click again, expect menu-hidden to return
      menuIcon.trigger('click');
      expect(menu).toHaveClass('menu-hidden');
    });
  });

  // Tests Initial entries
  describe('Initial Entries', function() {

    // loadFeed with first entry (0) before proceeding
    beforeEach(function(done) {
     loadFeed(0, function() {
       done();
     });
    });

    // once loadFeed run, checks that .feed container has .entry inside
    it('loads feeds', function(done) {
     const feeds = $('.feed');
     expect(feeds.find('.entry').length).not.toBe(0);
     done();
   });
  });

  // New feed selection Testing
  describe('New Feed Selection', function() {

    let oldTitle,
        newTitle;

    // Initializes title with current title, then loads new feed (1)
    beforeEach(function(done) {
     oldTitle = $('.header-title').html();

     loadFeed(1, function() {
       done();
     });
    });

    // When loadFeed changed, stores new Title, and compares for difference
    it('Should change content', function(done) {
     newTitle = $('.header-title').html();
     expect(oldTitle).not.toBe(newTitle);
     done();
    });
  });

}());
