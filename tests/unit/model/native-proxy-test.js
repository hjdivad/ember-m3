import { test, skip, module } from 'qunit';
import { setupTest, setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import DefaultSchema from 'ember-m3/services/m3-schema';

module('unit/model/native-proxy', function () {
  module('basic', function (hooks) {
    setupTest(hooks);

    hooks.beforeEach(function () {
      this.store = this.owner.lookup('service:store');
      this.store.useProxy = true;

      this.owner.register(
        'service:m3-schema',
        class TestSchema extends DefaultSchema {
          includesModel() {
            return true;
          }
        }
      );

      this.store.push({
        data: {
          id: 'urn:li:book:1',
          type: 'com.example.bookstore.Book',
          attributes: {
            title: 'How to Win Friends and Influence People',
          },
        },
      });
    });

    test('can access attribute without get', function (assert) {
      let book = this.store.peekRecord('com.example.bookstore.Book', 'urn:li:book:1');

      assert.strictEqual(book.title, 'How to Win Friends and Influence People');
    });

    skip('test using an array attribute');
  });

  module('rendering', function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function () {
      this.store = this.owner.lookup('service:store');
      this.store.useProxy = true;

      this.owner.register(
        'service:m3-schema',
        class TestSchema extends DefaultSchema {
          includesModel() {
            return true;
          }
        }
      );

      this.store.push({
        data: {
          id: 'urn:li:book:1',
          type: 'com.example.bookstore.Book',
          attributes: {
            title: 'How to Win Friends and Influence People',
          },
        },
      });
    });

    test('can render content', async function (assert) {
      this.book = this.store.peekRecord('com.example.bookstore.Book', 'urn:li:book:1');
      debugger;

      await render(hbs`{{this.book.title}}`);

      assert.strictEqual(this.element.textContent, 'How to Win Friends and Influence People');
    });
  });
});