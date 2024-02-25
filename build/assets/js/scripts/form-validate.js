"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var forms = document.querySelectorAll('[data-role="form-validate"]');

for (var i = 0; i < forms.length; i++) {
  formInit(forms[i]);
}

function formInit(form) {
  var phone = form.querySelector('[data-role="form-input-phone"]');
  var name = form.querySelector('[data-role="form-input-name"]');
  phone.addEventListener('input', removeError);
  form.addEventListener('submit', validate);
  var maskPhone = new IMask(phone, {
    mask: '+{7} (000) 000-00-00'
  });
  var maskName = new IMask(name, {
    mask: /^[А-ЯЁa-zA-Z\s]+$/i
  });

  function removeError() {
    this.classList.remove('input-error');
  }

  function validate(e) {
    e.preventDefault();

    if (maskPhone.unmaskedValue.length < 11) {
      phone.classList.add('input-error');
    } else {
      fetchForm();
    }
  }

  function fetchForm() {
    return _fetchForm.apply(this, arguments);
  }

  function _fetchForm() {
    _fetchForm = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var url, success;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              success = function _success() {
                console.log('success');
                closeModalForm(form);
                openThanks();
                phone.value = '';
                name.value = '';
              };

              url = form.getAttribute('action');
              fetch(url, {
                method: 'post',
                body: new FormData(form)
              }).then(function (res) {
                return res.json();
              }).then(function (data) {
                success();
              })["catch"](function () {
                console.log('error');
              });
              success();

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _fetchForm.apply(this, arguments);
  }
}

function closeModalForm(node) {
  var fancyboxContent = node.closest('.fancybox__content');

  if (fancyboxContent) {
    var closeBtn = fancyboxContent.querySelector('.is-close-btn');
    closeBtn.click();
  }
}

function openThanks() {
  var thanksOpen = document.querySelector('[data-element="modal-thanks-open"]');
  thanksOpen.click();
}

var modalThanksButton = document.querySelector('[data-element="modal-thanks-button"]');
modalThanksButton.addEventListener('click', function () {
  return closeModalForm(modalThanksButton);
});
//# sourceMappingURL=form-validate.js.map
