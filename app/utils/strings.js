let locale = 'en';
const strings = {};

// TODO: move to json files
strings.en = {
  mainHeaderMessage: 'Striveworks Image Manager',
  searchImages: 'Search Images...',
  uploadImage: 'Upload',
  noImagesFound: 'No images found!',
  noImagesFoundForQuery: `No images were found containing `,
  clickButtonToUpload: 'Click the \'Upload\' button to add some!',
  // downloads: 'Downloads',
  // keywords: 'Keywords',
  // publisher: 'Publisher',
  // rating: 'Rating',
  // revenue: 'Revenue',
  // reviews: 'Reviews',
  // stars: 'Stars',
};

export default {
  /**
   * Returns the localized string for the given key
   * @param key
   * @param args
   *     locale: String - two-letter locale code
   * @returns {(String|Object)}
   */
  str: function(key, args) {
    let myLocale = locale;
    if (args) {
      myLocale = args.locale || locale;
    }
    if (Object.prototype.hasOwnProperty.call(strings, myLocale)) {
      if (Object.prototype.hasOwnProperty.call(strings[locale], key)) {
        return strings[myLocale][key];
      } else {
        throw new Error(`Unknown string key: ${key} for locale: ${myLocale}`);
      }
    } else {
      throw new Error(`Unknown string locale: ${myLocale}`);
    }
  },

  setLocale: function(loc) {
    locale = loc;
  },
};
