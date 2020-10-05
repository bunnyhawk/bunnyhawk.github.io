/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/@babel/runtime/node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/@popperjs/core/lib/createPopper.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/createPopper.js ***!
  \*********************************************************/
/*! exports provided: popperGenerator, createPopper, detectOverflow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "popperGenerator", function() { return popperGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPopper", function() { return createPopper; });
/* harmony import */ var _dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-utils/getCompositeRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom-utils/listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/orderModifiers.js */ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js");
/* harmony import */ var _utils_debounce_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/debounce.js */ "./node_modules/@popperjs/core/lib/utils/debounce.js");
/* harmony import */ var _utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/validateModifiers.js */ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js");
/* harmony import */ var _utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/uniqueBy.js */ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/mergeByName.js */ "./node_modules/@popperjs/core/lib/utils/mergeByName.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "detectOverflow", function() { return _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");














var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign(Object.assign({}, DEFAULT_OPTIONS), defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(options) {
        cleanupModifierEffects();
        state.options = Object.assign(Object.assign(Object.assign({}, defaultOptions), state.options), options);
        state.scrollParents = {
          reference: Object(_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_12__["isElement"])(reference) ? Object(_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_2__["default"])(reference) : reference.contextElement ? Object(_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_2__["default"])(reference.contextElement) : [],
          popper: Object(_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_2__["default"])(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = Object(_utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_5__["default"])(Object(_utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_10__["default"])([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (true) {
          var modifiers = Object(_utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_8__["default"])([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          Object(_utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_7__["default"])(modifiers);

          if (Object(_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_9__["default"])(state.options.placement) === _enums_js__WEBPACK_IMPORTED_MODULE_13__["auto"]) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });

            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }

          var _getComputedStyle = Object(_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__["default"])(popper),
              marginTop = _getComputedStyle.marginTop,
              marginRight = _getComputedStyle.marginRight,
              marginBottom = _getComputedStyle.marginBottom,
              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer


          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: Object(_dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(reference, Object(_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_3__["default"])(popper), state.options.strategy === 'fixed'),
          popper: Object(_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_1__["default"])(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Object(_utils_debounce_js__WEBPACK_IMPORTED_MODULE_6__["default"])(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/contains.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/contains.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return contains; });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__["isShadowRoot"])(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getBoundingClientRect; });
function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getClippingRect; });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _getViewportRect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getViewportRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js");
/* harmony import */ var _getDocumentRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js");
/* harmony import */ var _listScrollParents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _getOffsetParent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utils/rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");














function getInnerBoundingClientRect(element) {
  var rect = Object(_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_8__["default"])(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === _enums_js__WEBPACK_IMPORTED_MODULE_0__["viewport"] ? Object(_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_12__["default"])(Object(_getViewportRect_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) : Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_7__["isHTMLElement"])(clippingParent) ? getInnerBoundingClientRect(clippingParent) : Object(_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_12__["default"])(Object(_getDocumentRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__["default"])(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = Object(_listScrollParents_js__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_getParentNode_js__WEBPACK_IMPORTED_MODULE_9__["default"])(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(Object(_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_6__["default"])(element).position) >= 0;
  var clipperElement = canEscapeClipping && Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_7__["isHTMLElement"])(element) ? Object(_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_4__["default"])(element) : element;

  if (!Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_7__["isElement"])(clipperElement)) {
    return [];
  } // $FlowFixMe: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_7__["isElement"])(clippingParent) && Object(_contains_js__WEBPACK_IMPORTED_MODULE_10__["default"])(clippingParent, clipperElement) && Object(_getNodeName_js__WEBPACK_IMPORTED_MODULE_11__["default"])(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = Math.max(rect.top, accRect.top);
    accRect.right = Math.min(rect.right, accRect.right);
    accRect.bottom = Math.min(rect.bottom, accRect.bottom);
    accRect.left = Math.max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getCompositeRect; });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getNodeScroll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getNodeScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");






 // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.

function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var documentElement = Object(_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__["default"])(offsetParent);
  var rect = Object(_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(elementOrVirtualElement);
  var isOffsetParentAnElement = Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_3__["isHTMLElement"])(offsetParent);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (Object(_getNodeName_js__WEBPACK_IMPORTED_MODULE_2__["default"])(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    Object(_isScrollParent_js__WEBPACK_IMPORTED_MODULE_6__["default"])(documentElement)) {
      scroll = Object(_getNodeScroll_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent);
    }

    if (Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_3__["isHTMLElement"])(offsetParent)) {
      offsets = Object(_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = Object(_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_4__["default"])(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getComputedStyle; });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getComputedStyle(element) {
  return Object(_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element).getComputedStyle(element);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getDocumentElement; });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function getDocumentElement(element) {
  // $FlowFixMe: assume body is always available
  return ((Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__["isElement"])(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getDocumentRect; });
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");



 // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var html = Object(_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var winScroll = Object(_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);
  var body = element.ownerDocument.body;
  var width = Math.max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = Math.max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + Object(_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element);
  var y = -winScroll.scrollTop;

  if (Object(_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body || html).direction === 'rtl') {
    x += Math.max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getHTMLElementScroll; });
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getLayoutRect; });
// Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.
function getLayoutRect(element) {
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: element.offsetWidth,
    height: element.offsetHeight
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getNodeName; });
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getNodeScroll; });
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getHTMLElementScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js");




function getNodeScroll(node) {
  if (node === Object(_getWindow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(node) || !Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_2__["isHTMLElement"])(node)) {
    return Object(_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node);
  } else {
    return Object(_getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node);
  }
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getOffsetParent; });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _isTableElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./isTableElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");








function getTrueOffsetParent(element) {
  if (!Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_3__["isHTMLElement"])(element) || // https://github.com/popperjs/popper-core/issues/837
  Object(_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element).position === 'fixed') {
    return null;
  }

  var offsetParent = element.offsetParent;

  if (offsetParent) {
    var html = Object(_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(offsetParent);

    if (Object(_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent) === 'body' && Object(_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_2__["default"])(offsetParent).position === 'static' && Object(_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_2__["default"])(html).position !== 'static') {
      return html;
    }
  }

  return offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var currentNode = Object(_getParentNode_js__WEBPACK_IMPORTED_MODULE_5__["default"])(element);

  while (Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_3__["isHTMLElement"])(currentNode) && ['html', 'body'].indexOf(Object(_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(currentNode)) < 0) {
    var css = Object(_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_2__["default"])(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.

    if (css.transform !== 'none' || css.perspective !== 'none' || css.willChange && css.willChange !== 'auto') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = Object(_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && Object(_isTableElement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) && Object(_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_2__["default"])(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && Object(_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent) === 'body' && Object(_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_2__["default"])(offsetParent).position === 'static') {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getParentNode; });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");


function getParentNode(element) {
  if (Object(_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element) === 'html') {
    return element;
  }

  return (// $FlowFixMe: this is a quicker (but less type safe) way to save quite some bytes from the bundle
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    // $FlowFixMe: need a better way to handle this...
    element.host || // ShadowRoot detected
    // $FlowFixMe: HTMLElement is a Node
    Object(_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element) // fallback

  );
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getScrollParent; });
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");




function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(Object(_getNodeName_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node)) >= 0) {
    // $FlowFixMe: assume body is always available
    return node.ownerDocument.body;
  }

  if (Object(_instanceOf_js__WEBPACK_IMPORTED_MODULE_3__["isHTMLElement"])(node) && Object(_isScrollParent_js__WEBPACK_IMPORTED_MODULE_1__["default"])(node)) {
    return node;
  }

  return getScrollParent(Object(_getParentNode_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getViewportRect; });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");



function getViewportRect(element) {
  var win = Object(_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var html = Object(_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + Object(_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element),
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js":
/*!****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindow.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getWindow; });
/*:: import type { Window } from '../types'; */

/*:: declare function getWindow(node: Node | Window): Window; */
function getWindow(node) {
  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getWindowScroll; });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getWindowScroll(node) {
  var win = Object(_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getWindowScrollBarX; });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");



function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return Object(_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)).left + Object(_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element).scrollLeft;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js ***!
  \*****************************************************************/
/*! exports provided: isElement, isHTMLElement, isShadowRoot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElement", function() { return isElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHTMLElement", function() { return isHTMLElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isShadowRoot", function() { return isShadowRoot; });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

/*:: declare function isElement(node: mixed): boolean %checks(node instanceof
  Element); */

function isElement(node) {
  var OwnElement = Object(_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
/*:: declare function isHTMLElement(node: mixed): boolean %checks(node instanceof
  HTMLElement); */


function isHTMLElement(node) {
  var OwnElement = Object(_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
/*:: declare function isShadowRoot(node: mixed): boolean %checks(node instanceof
  ShadowRoot); */


function isShadowRoot(node) {
  var OwnElement = Object(_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isScrollParent; });
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = Object(_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isTableElement; });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(Object(_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element)) >= 0;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js":
/*!************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return listScrollParents; });
/* harmony import */ var _getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");





/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the 
reference element's position.
*/

function listScrollParents(element, list) {
  if (list === void 0) {
    list = [];
  }

  var scrollParent = Object(_getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var isBody = Object(_getNodeName_js__WEBPACK_IMPORTED_MODULE_2__["default"])(scrollParent) === 'body';
  var win = Object(_getWindow_js__WEBPACK_IMPORTED_MODULE_3__["default"])(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], Object(_isScrollParent_js__WEBPACK_IMPORTED_MODULE_4__["default"])(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(Object(_getParentNode_js__WEBPACK_IMPORTED_MODULE_1__["default"])(target)));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/enums.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/enums.js ***!
  \**************************************************/
/*! exports provided: top, bottom, right, left, auto, basePlacements, start, end, clippingParents, viewport, popper, reference, variationPlacements, placements, beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite, modifierPhases */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "top", function() { return top; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bottom", function() { return bottom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "right", function() { return right; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "left", function() { return left; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "auto", function() { return auto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "basePlacements", function() { return basePlacements; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "start", function() { return start; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "end", function() { return end; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clippingParents", function() { return clippingParents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewport", function() { return viewport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "popper", function() { return popper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reference", function() { return reference; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "variationPlacements", function() { return variationPlacements; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "placements", function() { return placements; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "beforeRead", function() { return beforeRead; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "read", function() { return read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "afterRead", function() { return afterRead; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "beforeMain", function() { return beforeMain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "main", function() { return main; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "afterMain", function() { return afterMain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "beforeWrite", function() { return beforeWrite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "write", function() { return write; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "afterWrite", function() { return afterWrite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modifierPhases", function() { return modifierPhases; });
var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/index.js ***!
  \**************************************************/
/*! exports provided: top, bottom, right, left, auto, basePlacements, start, end, clippingParents, viewport, popper, reference, variationPlacements, placements, beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite, modifierPhases, applyStyles, arrow, computeStyles, eventListeners, flip, hide, offset, popperOffsets, preventOverflow, popperGenerator, detectOverflow, createPopperBase, createPopper, createPopperLite */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "top", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["top"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bottom", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["bottom"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "right", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["right"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "left", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["left"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "auto", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["auto"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "basePlacements", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["basePlacements"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "start", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["start"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "end", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["end"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clippingParents", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["clippingParents"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "viewport", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["viewport"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "popper", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["popper"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reference", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["reference"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "variationPlacements", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["variationPlacements"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "placements", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["placements"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "beforeRead", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["beforeRead"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "read", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["read"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "afterRead", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["afterRead"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "beforeMain", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["beforeMain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "main", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["main"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "afterMain", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["afterMain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "beforeWrite", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["beforeWrite"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "write", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["write"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "afterWrite", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["afterWrite"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "modifierPhases", function() { return _enums_js__WEBPACK_IMPORTED_MODULE_0__["modifierPhases"]; });

/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyStyles", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__["applyStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "arrow", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__["arrow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "computeStyles", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__["computeStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eventListeners", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__["eventListeners"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flip", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__["flip"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hide", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__["hide"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "offset", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__["offset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "popperOffsets", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__["popperOffsets"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "preventOverflow", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__["preventOverflow"]; });

/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "popperGenerator", function() { return _createPopper_js__WEBPACK_IMPORTED_MODULE_2__["popperGenerator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "detectOverflow", function() { return _createPopper_js__WEBPACK_IMPORTED_MODULE_2__["detectOverflow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createPopperBase", function() { return _createPopper_js__WEBPACK_IMPORTED_MODULE_2__["createPopper"]; });

/* harmony import */ var _popper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./popper.js */ "./node_modules/@popperjs/core/lib/popper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createPopper", function() { return _popper_js__WEBPACK_IMPORTED_MODULE_3__["createPopper"]; });

/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createPopperLite", function() { return _popper_lite_js__WEBPACK_IMPORTED_MODULE_4__["createPopper"]; });


 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/applyStyles.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

 // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!Object(_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__["isHTMLElement"])(element) || !Object(_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!Object(_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__["isHTMLElement"])(element) || !Object(_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe


      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect,
  requires: ['computeStyles']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/arrow.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/arrow.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");









 // eslint-disable-next-line import/no-unused-modules

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = Object(_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state.placement);
  var axis = Object(_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(basePlacement);
  var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_8__["left"], _enums_js__WEBPACK_IMPORTED_MODULE_8__["right"]].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = state.modifiersData[name + "#persistent"].padding;
  var arrowRect = Object(_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arrowElement);
  var minProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_8__["top"] : _enums_js__WEBPACK_IMPORTED_MODULE_8__["left"];
  var maxProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_8__["bottom"] : _enums_js__WEBPACK_IMPORTED_MODULE_8__["right"];
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = Object(_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_3__["default"])(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = Object(_utils_within_js__WEBPACK_IMPORTED_MODULE_5__["default"])(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element,
      _options$padding = options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (true) {
    if (!Object(_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_9__["isHTMLElement"])(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
    }
  }

  if (!Object(_dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state.elements.popper, arrowElement)) {
    if (true) {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
    }

    return;
  }

  state.elements.arrow = arrowElement;
  state.modifiersData[name + "#persistent"] = {
    padding: Object(_utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_6__["default"])(typeof padding !== 'number' ? padding : Object(_utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_7__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_8__["basePlacements"]))
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/computeStyles.js ***!
  \********************************************************************/
/*! exports provided: mapToStyles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapToStyles", function() { return mapToStyles; });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");





 // eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsets(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: Math.round(x * dpr) / dpr || 0,
    y: Math.round(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive;

  var _roundOffsets = roundOffsets(offsets),
      x = _roundOffsets.x,
      y = _roundOffsets.y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = _enums_js__WEBPACK_IMPORTED_MODULE_0__["left"];
  var sideY = _enums_js__WEBPACK_IMPORTED_MODULE_0__["top"];
  var win = window;

  if (adaptive) {
    var offsetParent = Object(_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_1__["default"])(popper);

    if (offsetParent === Object(_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(popper)) {
      offsetParent = Object(_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(popper);
    } // $FlowFixMe: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

    /*:: offsetParent = (offsetParent: Element); */


    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_0__["top"]) {
      sideY = _enums_js__WEBPACK_IMPORTED_MODULE_0__["bottom"];
      y -= offsetParent.clientHeight - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_0__["left"]) {
      sideX = _enums_js__WEBPACK_IMPORTED_MODULE_0__["right"];
      x -= offsetParent.clientWidth - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign(Object.assign({}, commonStyles), {}, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign(Object.assign({}, commonStyles), {}, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref3) {
  var state = _ref3.state,
      options = _ref3.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive;

  if (true) {
    var transitionProperty = Object(_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__["default"])(state.elements.popper).transitionProperty || '';

    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }

  var commonStyles = {
    placement: Object(_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign(Object.assign({}, state.styles.popper), mapToStyles(Object.assign(Object.assign({}, commonStyles), {}, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign(Object.assign({}, state.styles.arrow), mapToStyles(Object.assign(Object.assign({}, commonStyles), {}, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false
    })));
  }

  state.attributes.popper = Object.assign(Object.assign({}, state.attributes.popper), {}, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/eventListeners.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
 // eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = Object(_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/flip.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/flip.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getOppositePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getOppositeVariationPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/computeAutoPlacement.js */ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");






 // eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if (Object(_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_5__["auto"]) {
    return [];
  }

  var oppositePlacement = Object(_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);
  return [Object(_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(placement), oppositePlacement, Object(_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = Object(_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [Object(_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(Object(_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_5__["auto"] ? Object(_utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = Object(_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement);

    var isStartVariation = Object(_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_6__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_5__["start"];
    var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_5__["top"], _enums_js__WEBPACK_IMPORTED_MODULE_5__["bottom"]].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = Object(_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_3__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_5__["right"] : _enums_js__WEBPACK_IMPORTED_MODULE_5__["left"] : isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_5__["bottom"] : _enums_js__WEBPACK_IMPORTED_MODULE_5__["top"];

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = Object(_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(mainVariationSide);
    }

    var altVariationSide = Object(_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/hide.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/hide.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");



function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [_enums_js__WEBPACK_IMPORTED_MODULE_0__["top"], _enums_js__WEBPACK_IMPORTED_MODULE_0__["right"], _enums_js__WEBPACK_IMPORTED_MODULE_0__["bottom"], _enums_js__WEBPACK_IMPORTED_MODULE_0__["left"]].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = Object(_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = Object(_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign(Object.assign({}, state.attributes.popper), {}, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/index.js ***!
  \************************************************************/
/*! exports provided: applyStyles, arrow, computeStyles, eventListeners, flip, hide, offset, popperOffsets, preventOverflow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyStyles", function() { return _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _arrow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "arrow", function() { return _arrow_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "computeStyles", function() { return _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eventListeners", function() { return _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flip", function() { return _flip_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _hide_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hide", function() { return _hide_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _offset_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "offset", function() { return _offset_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "popperOffsets", function() { return _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "preventOverflow", function() { return _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });











/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/offset.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/offset.js ***!
  \*************************************************************/
/*! exports provided: distanceAndSkiddingToXY, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distanceAndSkiddingToXY", function() { return distanceAndSkiddingToXY; });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");


function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = Object(_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);
  var invertDistance = [_enums_js__WEBPACK_IMPORTED_MODULE_1__["left"], _enums_js__WEBPACK_IMPORTED_MODULE_1__["top"]].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign(Object.assign({}, rects), {}, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [_enums_js__WEBPACK_IMPORTED_MODULE_1__["left"], _enums_js__WEBPACK_IMPORTED_MODULE_1__["right"]].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = _enums_js__WEBPACK_IMPORTED_MODULE_1__["placements"].reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");


function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = Object(_utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getAltAxis.js */ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");











function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = Object(_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_7__["default"])(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = Object(_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state.placement);
  var variation = Object(_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_8__["default"])(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = Object(_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(basePlacement);
  var altAxis = Object(_utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_3__["default"])(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign(Object.assign({}, state.rects), {}, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var mainSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_0__["top"] : _enums_js__WEBPACK_IMPORTED_MODULE_0__["left"];
    var altSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_0__["bottom"] : _enums_js__WEBPACK_IMPORTED_MODULE_0__["right"];
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = popperOffsets[mainAxis] + overflow[mainSide];
    var max = popperOffsets[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_0__["start"] ? referenceRect[len] : popperRect[len];
    var maxLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_0__["start"] ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? Object(_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : Object(_utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_9__["default"])();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = Object(_utils_within_js__WEBPACK_IMPORTED_MODULE_4__["default"])(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && Object(_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;
    var preventedOffset = Object(_utils_within_js__WEBPACK_IMPORTED_MODULE_4__["default"])(tether ? Math.min(min, tetherMin) : min, offset, tether ? Math.max(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _mainSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_0__["top"] : _enums_js__WEBPACK_IMPORTED_MODULE_0__["left"];

    var _altSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_0__["bottom"] : _enums_js__WEBPACK_IMPORTED_MODULE_0__["right"];

    var _offset = popperOffsets[altAxis];

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var _preventedOffset = Object(_utils_within_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_min, _offset, _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper-lite.js":
/*!********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper-lite.js ***!
  \********************************************************/
/*! exports provided: createPopper, popperGenerator, defaultModifiers, detectOverflow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPopper", function() { return createPopper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultModifiers", function() { return defaultModifiers; });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "popperGenerator", function() { return _createPopper_js__WEBPACK_IMPORTED_MODULE_0__["popperGenerator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "detectOverflow", function() { return _createPopper_js__WEBPACK_IMPORTED_MODULE_0__["detectOverflow"]; });

/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");





var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_4__["default"]];
var createPopper = /*#__PURE__*/Object(_createPopper_js__WEBPACK_IMPORTED_MODULE_0__["popperGenerator"])({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper.js":
/*!***************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper.js ***!
  \***************************************************/
/*! exports provided: createPopper, popperGenerator, defaultModifiers, detectOverflow, createPopperLite, applyStyles, arrow, computeStyles, eventListeners, flip, hide, offset, popperOffsets, preventOverflow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPopper", function() { return createPopper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultModifiers", function() { return defaultModifiers; });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "popperGenerator", function() { return _createPopper_js__WEBPACK_IMPORTED_MODULE_0__["popperGenerator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "detectOverflow", function() { return _createPopper_js__WEBPACK_IMPORTED_MODULE_0__["detectOverflow"]; });

/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modifiers/offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modifiers/flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modifiers/preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");
/* harmony import */ var _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modifiers/arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modifiers/hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createPopperLite", function() { return _popper_lite_js__WEBPACK_IMPORTED_MODULE_10__["createPopper"]; });

/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyStyles", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_11__["applyStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "arrow", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_11__["arrow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "computeStyles", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_11__["computeStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eventListeners", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_11__["eventListeners"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flip", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_11__["flip"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hide", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_11__["hide"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "offset", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_11__["offset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "popperOffsets", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_11__["popperOffsets"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "preventOverflow", function() { return _modifiers_index_js__WEBPACK_IMPORTED_MODULE_11__["preventOverflow"]; });











var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_4__["default"], _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_5__["default"], _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_6__["default"], _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_7__["default"], _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_8__["default"], _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_9__["default"]];
var createPopper = /*#__PURE__*/Object(_createPopper_js__WEBPACK_IMPORTED_MODULE_0__["popperGenerator"])({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return computeAutoPlacement; });
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");





/*:: type OverflowsMap = { [ComputedPlacement]: number }; */

/*;; type OverflowsMap = { [key in ComputedPlacement]: number }; */
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_1__["placements"] : _options$allowedAutoP;
  var variation = Object(_getVariation_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);
  var placements = variation ? flipVariations ? _enums_js__WEBPACK_IMPORTED_MODULE_1__["variationPlacements"] : _enums_js__WEBPACK_IMPORTED_MODULE_1__["variationPlacements"].filter(function (placement) {
    return Object(_getVariation_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === variation;
  }) : _enums_js__WEBPACK_IMPORTED_MODULE_1__["basePlacements"]; // $FlowFixMe

  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;

    if (true) {
      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
    }
  } // $FlowFixMe: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = Object(_detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[Object(_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeOffsets.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return computeOffsets; });
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");




function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? Object(_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) : null;
  var variation = placement ? Object(_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case _enums_js__WEBPACK_IMPORTED_MODULE_3__["top"]:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_3__["bottom"]:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_3__["right"]:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_3__["left"]:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? Object(_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case _enums_js__WEBPACK_IMPORTED_MODULE_3__["start"]:
        offsets[mainAxis] = Math.floor(offsets[mainAxis]) - Math.floor(reference[len] / 2 - element[len] / 2);
        break;

      case _enums_js__WEBPACK_IMPORTED_MODULE_3__["end"]:
        offsets[mainAxis] = Math.floor(offsets[mainAxis]) + Math.ceil(reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/debounce.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/debounce.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return debounce; });
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/detectOverflow.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return detectOverflow; });
/* harmony import */ var _dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getClippingRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _computeOffsets_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");
/* harmony import */ var _rectToClientRect_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _expandToHashMap_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");








 // eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_5__["clippingParents"] : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_5__["viewport"] : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_5__["popper"] : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = Object(_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_7__["default"])(typeof padding !== 'number' ? padding : Object(_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_8__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_5__["basePlacements"]));
  var altContext = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_5__["popper"] ? _enums_js__WEBPACK_IMPORTED_MODULE_5__["reference"] : _enums_js__WEBPACK_IMPORTED_MODULE_5__["popper"];
  var referenceElement = state.elements.reference;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = Object(_dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_6__["isElement"])(element) ? element : element.contextElement || Object(_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = Object(_dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(referenceElement);
  var popperOffsets = Object(_computeOffsets_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = Object(_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_4__["default"])(Object.assign(Object.assign({}, popperRect), popperOffsets));
  var elementClientRect = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_5__["popper"] ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_5__["popper"] && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [_enums_js__WEBPACK_IMPORTED_MODULE_5__["right"], _enums_js__WEBPACK_IMPORTED_MODULE_5__["bottom"]].indexOf(key) >= 0 ? 1 : -1;
      var axis = [_enums_js__WEBPACK_IMPORTED_MODULE_5__["top"], _enums_js__WEBPACK_IMPORTED_MODULE_5__["bottom"]].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/expandToHashMap.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return expandToHashMap; });
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/format.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/format.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return format; });
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getAltAxis.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getAltAxis; });
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getBasePlacement.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getBasePlacement; });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getFreshSideObject; });
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getMainAxisFromPlacement; });
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getOppositePlacement; });
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getOppositeVariationPlacement; });
var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getVariation.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getVariation.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getVariation; });
function getVariation(placement) {
  return placement.split('-')[1];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergeByName.js":
/*!**************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergeByName.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return mergeByName; });
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign(Object.assign(Object.assign({}, existing), current), {}, {
      options: Object.assign(Object.assign({}, existing.options), current.options),
      data: Object.assign(Object.assign({}, existing.data), current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return mergePaddingObject; });
/* harmony import */ var _getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");

function mergePaddingObject(paddingObject) {
  return Object.assign(Object.assign({}, Object(_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])()), paddingObject);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/orderModifiers.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return orderModifiers; });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
 // source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return _enums_js__WEBPACK_IMPORTED_MODULE_0__["modifierPhases"].reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/rectToClientRect.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return rectToClientRect; });
function rectToClientRect(rect) {
  return Object.assign(Object.assign({}, rect), {}, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/uniqueBy.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return uniqueBy; });
function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/validateModifiers.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return validateModifiers; });
/* harmony import */ var _format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format.js */ "./node_modules/@popperjs/core/lib/utils/format.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");


var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    Object.keys(modifier).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error(Object(_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error(Object(_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

        case 'phase':
          if (_enums_js__WEBPACK_IMPORTED_MODULE_1__["modifierPhases"].indexOf(modifier.phase) < 0) {
            console.error(Object(_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + _enums_js__WEBPACK_IMPORTED_MODULE_1__["modifierPhases"].join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error(Object(_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (typeof modifier.effect !== 'function') {
            console.error(Object(_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (!Array.isArray(modifier.requires)) {
            console.error(Object(_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(Object(_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(Object(_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/within.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/within.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return within; });
function within(min, value, max) {
  return Math.max(min, Math.min(value, max));
}

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/xstate/es/Actor.js":
/*!*****************************************!*\
  !*** ./node_modules/xstate/es/Actor.js ***!
  \*****************************************/
/*! exports provided: createDeferredActor, createInvocableActor, createNullActor, isActor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDeferredActor", function() { return createDeferredActor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createInvocableActor", function() { return createInvocableActor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNullActor", function() { return createNullActor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isActor", function() { return isActor; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/xstate/es/utils.js");
/* harmony import */ var _serviceScope_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./serviceScope.js */ "./node_modules/xstate/es/serviceScope.js");



function createNullActor(id) {
  return {
    id: id,
    send: function () {
      return void 0;
    },
    subscribe: function () {
      return {
        unsubscribe: function () {
          return void 0;
        }
      };
    },
    toJSON: function () {
      return {
        id: id
      };
    }
  };
}
/**
 * Creates a deferred actor that is able to be invoked given the provided
 * invocation information in its `.meta` value.
 *
 * @param invokeDefinition The meta information needed to invoke the actor.
 */


function createInvocableActor(invokeDefinition, machine, context, _event) {
  var _a;

  var invokeSrc = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["toInvokeSource"])(invokeDefinition.src);
  var serviceCreator = (_a = machine === null || machine === void 0 ? void 0 : machine.options.services) === null || _a === void 0 ? void 0 : _a[invokeSrc.type];
  var resolvedData = invokeDefinition.data ? Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["mapContext"])(invokeDefinition.data, context, _event) : undefined;
  var tempActor = serviceCreator ? createDeferredActor(serviceCreator, invokeDefinition.id, resolvedData) : createNullActor(invokeDefinition.id);
  tempActor.meta = invokeDefinition;
  return tempActor;
}

function createDeferredActor(entity, id, data) {
  var tempActor = createNullActor(id);
  tempActor.deferred = true;

  if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["isMachine"])(entity)) {
    // "mute" the existing service scope so potential spawned actors within the `.initialState` stay deferred here
    tempActor.state = Object(_serviceScope_js__WEBPACK_IMPORTED_MODULE_1__["provide"])(undefined, function () {
      return (data ? entity.withContext(data) : entity).initialState;
    });
  }

  return tempActor;
}

function isActor(item) {
  try {
    return typeof item.send === 'function';
  } catch (e) {
    return false;
  }
}



/***/ }),

/***/ "./node_modules/xstate/es/Machine.js":
/*!*******************************************!*\
  !*** ./node_modules/xstate/es/Machine.js ***!
  \*******************************************/
/*! exports provided: Machine, createMachine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Machine", function() { return Machine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMachine", function() { return createMachine; });
/* harmony import */ var _StateNode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StateNode.js */ "./node_modules/xstate/es/StateNode.js");


function Machine(config, options, initialContext) {
  if (initialContext === void 0) {
    initialContext = config.context;
  }

  var resolvedInitialContext = typeof initialContext === 'function' ? initialContext() : initialContext;
  return new _StateNode_js__WEBPACK_IMPORTED_MODULE_0__["StateNode"](config, options, resolvedInitialContext);
}

function createMachine(config, options) {
  var resolvedInitialContext = typeof config.context === 'function' ? config.context() : config.context;
  return new _StateNode_js__WEBPACK_IMPORTED_MODULE_0__["StateNode"](config, options, resolvedInitialContext);
}



/***/ }),

/***/ "./node_modules/xstate/es/State.js":
/*!*****************************************!*\
  !*** ./node_modules/xstate/es/State.js ***!
  \*****************************************/
/*! exports provided: State, bindActionToState, isState, stateValuesEqual */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "State", function() { return State; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionToState", function() { return bindActionToState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isState", function() { return isState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stateValuesEqual", function() { return stateValuesEqual; });
/* harmony import */ var _virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_virtual/_tslib.js */ "./node_modules/xstate/es/_virtual/_tslib.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ "./node_modules/xstate/es/constants.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/xstate/es/utils.js");
/* harmony import */ var _stateUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stateUtils.js */ "./node_modules/xstate/es/stateUtils.js");
/* harmony import */ var _actions_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions.js */ "./node_modules/xstate/es/actions.js");






function stateValuesEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (a === undefined || b === undefined) {
    return false;
  }

  if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isString"])(a) || Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isString"])(b)) {
    return a === b;
  }

  var aKeys = Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["keys"])(a);
  var bKeys = Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["keys"])(b);
  return aKeys.length === bKeys.length && aKeys.every(function (key) {
    return stateValuesEqual(a[key], b[key]);
  });
}

function isState(state) {
  if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isString"])(state)) {
    return false;
  }

  return 'value' in state && 'history' in state;
}

function bindActionToState(action, state) {
  var exec = action.exec;

  var boundAction = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, action), {
    exec: exec !== undefined ? function () {
      return exec(state.context, state.event, {
        action: action,
        state: state,
        _event: state._event
      });
    } : undefined
  });

  return boundAction;
}

var State =
/*#__PURE__*/

/** @class */
function () {
  /**
   * Creates a new State instance.
   * @param value The state value
   * @param context The extended state
   * @param historyValue The tree representing historical values of the state nodes
   * @param history The previous state
   * @param actions An array of action objects to execute as side-effects
   * @param activities A mapping of activities and whether they are started (`true`) or stopped (`false`).
   * @param meta
   * @param events Internal event queue. Should be empty with run-to-completion semantics.
   * @param configuration
   */
  function State(config) {
    var _this = this;

    this.actions = [];
    this.activities = _constants_js__WEBPACK_IMPORTED_MODULE_1__["EMPTY_ACTIVITY_MAP"];
    this.meta = {};
    this.events = [];
    this.value = config.value;
    this.context = config.context;
    this._event = config._event;
    this._sessionid = config._sessionid;
    this.event = this._event.data;
    this.historyValue = config.historyValue;
    this.history = config.history;
    this.actions = config.actions || [];
    this.activities = config.activities || _constants_js__WEBPACK_IMPORTED_MODULE_1__["EMPTY_ACTIVITY_MAP"];
    this.meta = config.meta || {};
    this.events = config.events || [];
    this.matches = this.matches.bind(this);
    this.toStrings = this.toStrings.bind(this);
    this.configuration = config.configuration;
    this.transitions = config.transitions;
    this.children = config.children;
    this.done = !!config.done;
    Object.defineProperty(this, 'nextEvents', {
      get: function () {
        return Object(_stateUtils_js__WEBPACK_IMPORTED_MODULE_3__["nextEvents"])(_this.configuration);
      }
    });
  }
  /**
   * Creates a new State instance for the given `stateValue` and `context`.
   * @param stateValue
   * @param context
   */


  State.from = function (stateValue, context) {
    if (stateValue instanceof State) {
      if (stateValue.context !== context) {
        return new State({
          value: stateValue.value,
          context: context,
          _event: stateValue._event,
          _sessionid: null,
          historyValue: stateValue.historyValue,
          history: stateValue.history,
          actions: [],
          activities: stateValue.activities,
          meta: {},
          events: [],
          configuration: [],
          transitions: [],
          children: {}
        });
      }

      return stateValue;
    }

    var _event = _actions_js__WEBPACK_IMPORTED_MODULE_4__["initEvent"];
    return new State({
      value: stateValue,
      context: context,
      _event: _event,
      _sessionid: null,
      historyValue: undefined,
      history: undefined,
      actions: [],
      activities: undefined,
      meta: undefined,
      events: [],
      configuration: [],
      transitions: [],
      children: {}
    });
  };
  /**
   * Creates a new State instance for the given `config`.
   * @param config The state config
   */


  State.create = function (config) {
    return new State(config);
  };
  /**
   * Creates a new `State` instance for the given `stateValue` and `context` with no actions (side-effects).
   * @param stateValue
   * @param context
   */


  State.inert = function (stateValue, context) {
    if (stateValue instanceof State) {
      if (!stateValue.actions.length) {
        return stateValue;
      }

      var _event = _actions_js__WEBPACK_IMPORTED_MODULE_4__["initEvent"];
      return new State({
        value: stateValue.value,
        context: context,
        _event: _event,
        _sessionid: null,
        historyValue: stateValue.historyValue,
        history: stateValue.history,
        activities: stateValue.activities,
        configuration: stateValue.configuration,
        transitions: [],
        children: {}
      });
    }

    return State.from(stateValue, context);
  };
  /**
   * Returns an array of all the string leaf state node paths.
   * @param stateValue
   * @param delimiter The character(s) that separate each subpath in the string state node path.
   */


  State.prototype.toStrings = function (stateValue, delimiter) {
    var _this = this;

    if (stateValue === void 0) {
      stateValue = this.value;
    }

    if (delimiter === void 0) {
      delimiter = '.';
    }

    if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isString"])(stateValue)) {
      return [stateValue];
    }

    var valueKeys = Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["keys"])(stateValue);
    return valueKeys.concat.apply(valueKeys, Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__spread"])(valueKeys.map(function (key) {
      return _this.toStrings(stateValue[key], delimiter).map(function (s) {
        return key + delimiter + s;
      });
    })));
  };

  State.prototype.toJSON = function () {
    var _a = this,
        configuration = _a.configuration,
        transitions = _a.transitions,
        jsonValues = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["configuration", "transitions"]);

    return jsonValues;
  };
  /**
   * Whether the current state value is a subset of the given parent state value.
   * @param parentStateValue
   */


  State.prototype.matches = function (parentStateValue) {
    return Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["matchesState"])(parentStateValue, this.value);
  };

  return State;
}();



/***/ }),

/***/ "./node_modules/xstate/es/StateNode.js":
/*!*********************************************!*\
  !*** ./node_modules/xstate/es/StateNode.js ***!
  \*********************************************/
/*! exports provided: StateNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StateNode", function() { return StateNode; });
/* harmony import */ var _virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_virtual/_tslib.js */ "./node_modules/xstate/es/_virtual/_tslib.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ "./node_modules/xstate/es/constants.js");
/* harmony import */ var _environment_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./environment.js */ "./node_modules/xstate/es/environment.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./node_modules/xstate/es/utils.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types.js */ "./node_modules/xstate/es/types.js");
/* harmony import */ var _stateUtils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./stateUtils.js */ "./node_modules/xstate/es/stateUtils.js");
/* harmony import */ var _actionTypes_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./actionTypes.js */ "./node_modules/xstate/es/actionTypes.js");
/* harmony import */ var _actions_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./actions.js */ "./node_modules/xstate/es/actions.js");
/* harmony import */ var _State_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./State.js */ "./node_modules/xstate/es/State.js");
/* harmony import */ var _Actor_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Actor.js */ "./node_modules/xstate/es/Actor.js");
/* harmony import */ var _invokeUtils_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./invokeUtils.js */ "./node_modules/xstate/es/invokeUtils.js");











var NULL_EVENT = '';
var STATE_IDENTIFIER = '#';
var WILDCARD = '*';
var EMPTY_OBJECT = {};

var isStateId = function (str) {
  return str[0] === STATE_IDENTIFIER;
};

var createDefaultOptions = function () {
  return {
    actions: {},
    guards: {},
    services: {},
    activities: {},
    delays: {}
  };
};

var validateArrayifiedTransitions = function (stateNode, event, transitions) {
  var hasNonLastUnguardedTarget = transitions.slice(0, -1).some(function (transition) {
    return !('cond' in transition) && !('in' in transition) && (Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["isString"])(transition.target) || Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["isMachine"])(transition.target));
  });
  var eventText = event === NULL_EVENT ? 'the transient event' : "event '" + event + "'";
  Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["warn"])(!hasNonLastUnguardedTarget, "One or more transitions for " + eventText + " on state '" + stateNode.id + "' are unreachable. " + "Make sure that the default transition is the last one defined.");
};

var StateNode =
/*#__PURE__*/

/** @class */
function () {
  function StateNode(
  /**
   * The raw config used to create the machine.
   */
  config, options,
  /**
   * The initial extended state
   */
  context) {
    var _this = this;

    this.config = config;
    this.context = context;
    /**
     * The order this state node appears. Corresponds to the implicit SCXML document order.
     */

    this.order = -1;
    this.__xstatenode = true;
    this.__cache = {
      events: undefined,
      relativeValue: new Map(),
      initialStateValue: undefined,
      initialState: undefined,
      on: undefined,
      transitions: undefined,
      candidates: {},
      delayedTransitions: undefined
    };
    this.idMap = {};
    this.options = Object.assign(createDefaultOptions(), options);
    this.parent = this.options._parent;
    this.key = this.config.key || this.options._key || this.config.id || '(machine)';
    this.machine = this.parent ? this.parent.machine : this;
    this.path = this.parent ? this.parent.path.concat(this.key) : [];
    this.delimiter = this.config.delimiter || (this.parent ? this.parent.delimiter : _constants_js__WEBPACK_IMPORTED_MODULE_1__["STATE_DELIMITER"]);
    this.id = this.config.id || Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__spread"])([this.machine.key], this.path).join(this.delimiter);
    this.version = this.parent ? this.parent.version : this.config.version;
    this.type = this.config.type || (this.config.parallel ? 'parallel' : this.config.states && Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["keys"])(this.config.states).length ? 'compound' : this.config.history ? 'history' : 'atomic');

    if (!_environment_js__WEBPACK_IMPORTED_MODULE_2__["IS_PRODUCTION"]) {
      Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["warn"])(!('parallel' in this.config), "The \"parallel\" property is deprecated and will be removed in version 4.1. " + (this.config.parallel ? "Replace with `type: 'parallel'`" : "Use `type: '" + this.type + "'`") + " in the config for state node '" + this.id + "' instead.");
    }

    this.initial = this.config.initial;
    this.states = this.config.states ? Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["mapValues"])(this.config.states, function (stateConfig, key) {
      var _a;

      var stateNode = new StateNode(stateConfig, {
        _parent: _this,
        _key: key
      });
      Object.assign(_this.idMap, Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])((_a = {}, _a[stateNode.id] = stateNode, _a), stateNode.idMap));
      return stateNode;
    }) : EMPTY_OBJECT; // Document order

    var order = 0;

    function dfs(stateNode) {
      var e_1, _a;

      stateNode.order = order++;

      try {
        for (var _b = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(Object(_stateUtils_js__WEBPACK_IMPORTED_MODULE_5__["getChildren"])(stateNode)), _c = _b.next(); !_c.done; _c = _b.next()) {
          var child = _c.value;
          dfs(child);
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }

    dfs(this); // History config

    this.history = this.config.history === true ? 'shallow' : this.config.history || false;
    this._transient = !!this.config.always || (!this.config.on ? false : Array.isArray(this.config.on) ? this.config.on.some(function (_a) {
      var event = _a.event;
      return event === NULL_EVENT;
    }) : NULL_EVENT in this.config.on);
    this.strict = !!this.config.strict; // TODO: deprecate (entry)

    this.onEntry = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toArray"])(this.config.entry || this.config.onEntry).map(function (action) {
      return Object(_actions_js__WEBPACK_IMPORTED_MODULE_7__["toActionObject"])(action);
    }); // TODO: deprecate (exit)

    this.onExit = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toArray"])(this.config.exit || this.config.onExit).map(function (action) {
      return Object(_actions_js__WEBPACK_IMPORTED_MODULE_7__["toActionObject"])(action);
    });
    this.meta = this.config.meta;
    this.doneData = this.type === 'final' ? this.config.data : undefined;
    this.invoke = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toArray"])(this.config.invoke).map(function (invokeConfig, i) {
      var _a, _b;

      if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["isMachine"])(invokeConfig)) {
        _this.machine.options.services = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])((_a = {}, _a[invokeConfig.id] = invokeConfig, _a), _this.machine.options.services);
        return Object(_invokeUtils_js__WEBPACK_IMPORTED_MODULE_10__["toInvokeDefinition"])({
          src: invokeConfig.id,
          id: invokeConfig.id
        });
      } else if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["isString"])(invokeConfig.src)) {
        return Object(_invokeUtils_js__WEBPACK_IMPORTED_MODULE_10__["toInvokeDefinition"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, invokeConfig), {
          id: invokeConfig.id || invokeConfig.src,
          src: invokeConfig.src
        }));
      } else if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["isMachine"])(invokeConfig.src) || Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["isFunction"])(invokeConfig.src)) {
        var invokeSrc = _this.id + ":invocation[" + i + "]"; // TODO: util function

        _this.machine.options.services = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])((_b = {}, _b[invokeSrc] = invokeConfig.src, _b), _this.machine.options.services);
        return Object(_invokeUtils_js__WEBPACK_IMPORTED_MODULE_10__["toInvokeDefinition"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({
          id: invokeSrc
        }, invokeConfig), {
          src: invokeSrc
        }));
      } else {
        var invokeSource = invokeConfig.src;
        return Object(_invokeUtils_js__WEBPACK_IMPORTED_MODULE_10__["toInvokeDefinition"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({
          id: invokeSource.type
        }, invokeConfig), {
          src: invokeSource
        }));
      }
    });
    this.activities = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toArray"])(this.config.activities).concat(this.invoke).map(function (activity) {
      return Object(_actions_js__WEBPACK_IMPORTED_MODULE_7__["toActivityDefinition"])(activity);
    });
    this.transition = this.transition.bind(this); // TODO: this is the real fix for initialization once
    // state node getters are deprecated
    // if (!this.parent) {
    //   this._init();
    // }
  }

  StateNode.prototype._init = function () {
    if (this.__cache.transitions) {
      return;
    }

    Object(_stateUtils_js__WEBPACK_IMPORTED_MODULE_5__["getAllStateNodes"])(this).forEach(function (stateNode) {
      return stateNode.on;
    });
  };
  /**
   * Clones this state machine with custom options and context.
   *
   * @param options Options (actions, guards, activities, services) to recursively merge with the existing options.
   * @param context Custom context (will override predefined context)
   */


  StateNode.prototype.withConfig = function (options, context) {
    if (context === void 0) {
      context = this.context;
    }

    var _a = this.options,
        actions = _a.actions,
        activities = _a.activities,
        guards = _a.guards,
        services = _a.services,
        delays = _a.delays;
    return new StateNode(this.config, {
      actions: Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, actions), options.actions),
      activities: Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, activities), options.activities),
      guards: Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, guards), options.guards),
      services: Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, services), options.services),
      delays: Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, delays), options.delays)
    }, context);
  };
  /**
   * Clones this state machine with custom context.
   *
   * @param context Custom context (will override predefined context, not recursive)
   */


  StateNode.prototype.withContext = function (context) {
    return new StateNode(this.config, this.options, context);
  };

  Object.defineProperty(StateNode.prototype, "definition", {
    /**
     * The well-structured state node definition.
     */
    get: function () {
      return {
        id: this.id,
        key: this.key,
        version: this.version,
        context: this.context,
        type: this.type,
        initial: this.initial,
        history: this.history,
        states: Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["mapValues"])(this.states, function (state) {
          return state.definition;
        }),
        on: this.on,
        transitions: this.transitions,
        entry: this.onEntry,
        exit: this.onExit,
        activities: this.activities || [],
        meta: this.meta,
        order: this.order || -1,
        data: this.doneData,
        invoke: this.invoke
      };
    },
    enumerable: false,
    configurable: true
  });

  StateNode.prototype.toJSON = function () {
    return this.definition;
  };

  Object.defineProperty(StateNode.prototype, "on", {
    /**
     * The mapping of events to transitions.
     */
    get: function () {
      if (this.__cache.on) {
        return this.__cache.on;
      }

      var transitions = this.transitions;
      return this.__cache.on = transitions.reduce(function (map, transition) {
        map[transition.eventType] = map[transition.eventType] || [];
        map[transition.eventType].push(transition);
        return map;
      }, {});
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StateNode.prototype, "after", {
    get: function () {
      return this.__cache.delayedTransitions || (this.__cache.delayedTransitions = this.getDelayedTransitions(), this.__cache.delayedTransitions);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StateNode.prototype, "transitions", {
    /**
     * All the transitions that can be taken from this state node.
     */
    get: function () {
      return this.__cache.transitions || (this.__cache.transitions = this.formatTransitions(), this.__cache.transitions);
    },
    enumerable: false,
    configurable: true
  });

  StateNode.prototype.getCandidates = function (eventName) {
    if (this.__cache.candidates[eventName]) {
      return this.__cache.candidates[eventName];
    }

    var transient = eventName === NULL_EVENT;
    var candidates = this.transitions.filter(function (transition) {
      var sameEventType = transition.eventType === eventName; // null events should only match against eventless transitions

      return transient ? sameEventType : sameEventType || transition.eventType === WILDCARD;
    });
    this.__cache.candidates[eventName] = candidates;
    return candidates;
  };
  /**
   * All delayed transitions from the config.
   */


  StateNode.prototype.getDelayedTransitions = function () {
    var _this = this;

    var afterConfig = this.config.after;

    if (!afterConfig) {
      return [];
    }

    var mutateEntryExit = function (delay, i) {
      var delayRef = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["isFunction"])(delay) ? _this.id + ":delay[" + i + "]" : delay;
      var eventType = Object(_actions_js__WEBPACK_IMPORTED_MODULE_7__["after"])(delayRef, _this.id);

      _this.onEntry.push(Object(_actions_js__WEBPACK_IMPORTED_MODULE_7__["send"])(eventType, {
        delay: delay
      }));

      _this.onExit.push(Object(_actions_js__WEBPACK_IMPORTED_MODULE_7__["cancel"])(eventType));

      return eventType;
    };

    var delayedTransitions = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["isArray"])(afterConfig) ? afterConfig.map(function (transition, i) {
      var eventType = mutateEntryExit(transition.delay, i);
      return Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, transition), {
        event: eventType
      });
    }) : Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["flatten"])(Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["keys"])(afterConfig).map(function (delay, i) {
      var configTransition = afterConfig[delay];
      var resolvedTransition = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["isString"])(configTransition) ? {
        target: configTransition
      } : configTransition;
      var resolvedDelay = !isNaN(+delay) ? +delay : delay;
      var eventType = mutateEntryExit(resolvedDelay, i);
      return Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toArray"])(resolvedTransition).map(function (transition) {
        return Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, transition), {
          event: eventType,
          delay: resolvedDelay
        });
      });
    }));
    return delayedTransitions.map(function (delayedTransition) {
      var delay = delayedTransition.delay;
      return Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, _this.formatTransition(delayedTransition)), {
        delay: delay
      });
    });
  };
  /**
   * Returns the state nodes represented by the current state value.
   *
   * @param state The state value or State instance
   */


  StateNode.prototype.getStateNodes = function (state) {
    var _a;

    var _this = this;

    if (!state) {
      return [];
    }

    var stateValue = state instanceof _State_js__WEBPACK_IMPORTED_MODULE_8__["State"] ? state.value : Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toStateValue"])(state, this.delimiter);

    if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["isString"])(stateValue)) {
      var initialStateValue = this.getStateNode(stateValue).initial;
      return initialStateValue !== undefined ? this.getStateNodes((_a = {}, _a[stateValue] = initialStateValue, _a)) : [this.states[stateValue]];
    }

    var subStateKeys = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["keys"])(stateValue);
    var subStateNodes = subStateKeys.map(function (subStateKey) {
      return _this.getStateNode(subStateKey);
    });
    return subStateNodes.concat(subStateKeys.reduce(function (allSubStateNodes, subStateKey) {
      var subStateNode = _this.getStateNode(subStateKey).getStateNodes(stateValue[subStateKey]);

      return allSubStateNodes.concat(subStateNode);
    }, []));
  };
  /**
   * Returns `true` if this state node explicitly handles the given event.
   *
   * @param event The event in question
   */


  StateNode.prototype.handles = function (event) {
    var eventType = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["getEventType"])(event);
    return this.events.includes(eventType);
  };
  /**
   * Resolves the given `state` to a new `State` instance relative to this machine.
   *
   * This ensures that `.events` and `.nextEvents` represent the correct values.
   *
   * @param state The state to resolve
   */


  StateNode.prototype.resolveState = function (state) {
    var configuration = Array.from(Object(_stateUtils_js__WEBPACK_IMPORTED_MODULE_5__["getConfiguration"])([], this.getStateNodes(state.value)));
    return new _State_js__WEBPACK_IMPORTED_MODULE_8__["State"](Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, state), {
      value: this.resolve(state.value),
      configuration: configuration
    }));
  };

  StateNode.prototype.transitionLeafNode = function (stateValue, state, _event) {
    var stateNode = this.getStateNode(stateValue);
    var next = stateNode.next(state, _event);

    if (!next || !next.transitions.length) {
      return this.next(state, _event);
    }

    return next;
  };

  StateNode.prototype.transitionCompoundNode = function (stateValue, state, _event) {
    var subStateKeys = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["keys"])(stateValue);
    var stateNode = this.getStateNode(subStateKeys[0]);

    var next = stateNode._transition(stateValue[subStateKeys[0]], state, _event);

    if (!next || !next.transitions.length) {
      return this.next(state, _event);
    }

    return next;
  };

  StateNode.prototype.transitionParallelNode = function (stateValue, state, _event) {
    var e_2, _a;

    var transitionMap = {};

    try {
      for (var _b = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["keys"])(stateValue)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var subStateKey = _c.value;
        var subStateValue = stateValue[subStateKey];

        if (!subStateValue) {
          continue;
        }

        var subStateNode = this.getStateNode(subStateKey);

        var next = subStateNode._transition(subStateValue, state, _event);

        if (next) {
          transitionMap[subStateKey] = next;
        }
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_2) throw e_2.error;
      }
    }

    var stateTransitions = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["keys"])(transitionMap).map(function (key) {
      return transitionMap[key];
    });
    var enabledTransitions = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["flatten"])(stateTransitions.map(function (st) {
      return st.transitions;
    }));
    var willTransition = stateTransitions.some(function (st) {
      return st.transitions.length > 0;
    });

    if (!willTransition) {
      return this.next(state, _event);
    }

    var entryNodes = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["flatten"])(stateTransitions.map(function (t) {
      return t.entrySet;
    }));
    var configuration = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["flatten"])(Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["keys"])(transitionMap).map(function (key) {
      return transitionMap[key].configuration;
    }));
    return {
      transitions: enabledTransitions,
      entrySet: entryNodes,
      exitSet: Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["flatten"])(stateTransitions.map(function (t) {
        return t.exitSet;
      })),
      configuration: configuration,
      source: state,
      actions: Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["flatten"])(Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["keys"])(transitionMap).map(function (key) {
        return transitionMap[key].actions;
      }))
    };
  };

  StateNode.prototype._transition = function (stateValue, state, _event) {
    // leaf node
    if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["isString"])(stateValue)) {
      return this.transitionLeafNode(stateValue, state, _event);
    } // hierarchical node


    if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["keys"])(stateValue).length === 1) {
      return this.transitionCompoundNode(stateValue, state, _event);
    } // orthogonal node


    return this.transitionParallelNode(stateValue, state, _event);
  };

  StateNode.prototype.next = function (state, _event) {
    var e_3, _a;

    var _this = this;

    var eventName = _event.name;
    var actions = [];
    var nextStateNodes = [];
    var selectedTransition;

    try {
      for (var _b = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.getCandidates(eventName)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var candidate = _c.value;
        var cond = candidate.cond,
            stateIn = candidate.in;
        var resolvedContext = state.context;
        var isInState = stateIn ? Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["isString"])(stateIn) && isStateId(stateIn) ? // Check if in state by ID
        state.matches(Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toStateValue"])(this.getStateNodeById(stateIn).path, this.delimiter)) : // Check if in state by relative grandparent
        Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["matchesState"])(Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toStateValue"])(stateIn, this.delimiter), Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["path"])(this.path.slice(0, -2))(state.value)) : true;
        var guardPassed = false;

        try {
          guardPassed = !cond || Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["evaluateGuard"])(this.machine, cond, resolvedContext, _event, state);
        } catch (err) {
          throw new Error("Unable to evaluate guard '" + (cond.name || cond.type) + "' in transition for event '" + eventName + "' in state node '" + this.id + "':\n" + err.message);
        }

        if (guardPassed && isInState) {
          if (candidate.target !== undefined) {
            nextStateNodes = candidate.target;
          }

          actions.push.apply(actions, Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__spread"])(candidate.actions));
          selectedTransition = candidate;
          break;
        }
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_3) throw e_3.error;
      }
    }

    if (!selectedTransition) {
      return undefined;
    }

    if (!nextStateNodes.length) {
      return {
        transitions: [selectedTransition],
        entrySet: [],
        exitSet: [],
        configuration: state.value ? [this] : [],
        source: state,
        actions: actions
      };
    }

    var allNextStateNodes = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["flatten"])(nextStateNodes.map(function (stateNode) {
      return _this.getRelativeStateNodes(stateNode, state.historyValue);
    }));
    var isInternal = !!selectedTransition.internal;
    var reentryNodes = isInternal ? [] : Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["flatten"])(allNextStateNodes.map(function (n) {
      return _this.nodesFromChild(n);
    }));
    return {
      transitions: [selectedTransition],
      entrySet: reentryNodes,
      exitSet: isInternal ? [] : [this],
      configuration: allNextStateNodes,
      source: state,
      actions: actions
    };
  };

  StateNode.prototype.nodesFromChild = function (childStateNode) {
    if (childStateNode.escapes(this)) {
      return [];
    }

    var nodes = [];
    var marker = childStateNode;

    while (marker && marker !== this) {
      nodes.push(marker);
      marker = marker.parent;
    }

    nodes.push(this); // inclusive

    return nodes;
  };
  /**
   * Whether the given state node "escapes" this state node. If the `stateNode` is equal to or the parent of
   * this state node, it does not escape.
   */


  StateNode.prototype.escapes = function (stateNode) {
    if (this === stateNode) {
      return false;
    }

    var parent = this.parent;

    while (parent) {
      if (parent === stateNode) {
        return false;
      }

      parent = parent.parent;
    }

    return true;
  };

  StateNode.prototype.getActions = function (transition, currentContext, _event, prevState) {
    var e_4, _a, e_5, _b;

    var prevConfig = Object(_stateUtils_js__WEBPACK_IMPORTED_MODULE_5__["getConfiguration"])([], prevState ? this.getStateNodes(prevState.value) : [this]);
    var resolvedConfig = transition.configuration.length ? Object(_stateUtils_js__WEBPACK_IMPORTED_MODULE_5__["getConfiguration"])(prevConfig, transition.configuration) : prevConfig;

    try {
      for (var resolvedConfig_1 = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(resolvedConfig), resolvedConfig_1_1 = resolvedConfig_1.next(); !resolvedConfig_1_1.done; resolvedConfig_1_1 = resolvedConfig_1.next()) {
        var sn = resolvedConfig_1_1.value;

        if (!Object(_stateUtils_js__WEBPACK_IMPORTED_MODULE_5__["has"])(prevConfig, sn)) {
          transition.entrySet.push(sn);
        }
      }
    } catch (e_4_1) {
      e_4 = {
        error: e_4_1
      };
    } finally {
      try {
        if (resolvedConfig_1_1 && !resolvedConfig_1_1.done && (_a = resolvedConfig_1.return)) _a.call(resolvedConfig_1);
      } finally {
        if (e_4) throw e_4.error;
      }
    }

    try {
      for (var prevConfig_1 = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(prevConfig), prevConfig_1_1 = prevConfig_1.next(); !prevConfig_1_1.done; prevConfig_1_1 = prevConfig_1.next()) {
        var sn = prevConfig_1_1.value;

        if (!Object(_stateUtils_js__WEBPACK_IMPORTED_MODULE_5__["has"])(resolvedConfig, sn) || Object(_stateUtils_js__WEBPACK_IMPORTED_MODULE_5__["has"])(transition.exitSet, sn.parent)) {
          transition.exitSet.push(sn);
        }
      }
    } catch (e_5_1) {
      e_5 = {
        error: e_5_1
      };
    } finally {
      try {
        if (prevConfig_1_1 && !prevConfig_1_1.done && (_b = prevConfig_1.return)) _b.call(prevConfig_1);
      } finally {
        if (e_5) throw e_5.error;
      }
    }

    if (!transition.source) {
      transition.exitSet = []; // Ensure that root StateNode (machine) is entered

      transition.entrySet.push(this);
    }

    var doneEvents = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["flatten"])(transition.entrySet.map(function (sn) {
      var events = [];

      if (sn.type !== 'final') {
        return events;
      }

      var parent = sn.parent;

      if (!parent.parent) {
        return events;
      }

      events.push(Object(_actions_js__WEBPACK_IMPORTED_MODULE_7__["done"])(sn.id, sn.doneData), // TODO: deprecate - final states should not emit done events for their own state.
      Object(_actions_js__WEBPACK_IMPORTED_MODULE_7__["done"])(parent.id, sn.doneData ? Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["mapContext"])(sn.doneData, currentContext, _event) : undefined));
      var grandparent = parent.parent;

      if (grandparent.type === 'parallel') {
        if (Object(_stateUtils_js__WEBPACK_IMPORTED_MODULE_5__["getChildren"])(grandparent).every(function (parentNode) {
          return Object(_stateUtils_js__WEBPACK_IMPORTED_MODULE_5__["isInFinalState"])(transition.configuration, parentNode);
        })) {
          events.push(Object(_actions_js__WEBPACK_IMPORTED_MODULE_7__["done"])(grandparent.id));
        }
      }

      return events;
    }));
    transition.exitSet.sort(function (a, b) {
      return b.order - a.order;
    });
    transition.entrySet.sort(function (a, b) {
      return a.order - b.order;
    });
    var entryStates = new Set(transition.entrySet);
    var exitStates = new Set(transition.exitSet);

    var _c = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__read"])([Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["flatten"])(Array.from(entryStates).map(function (stateNode) {
      return Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__spread"])(stateNode.activities.map(function (activity) {
        return Object(_actions_js__WEBPACK_IMPORTED_MODULE_7__["start"])(activity);
      }), stateNode.onEntry);
    })).concat(doneEvents.map(_actions_js__WEBPACK_IMPORTED_MODULE_7__["raise"])), Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["flatten"])(Array.from(exitStates).map(function (stateNode) {
      return Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__spread"])(stateNode.onExit, stateNode.activities.map(function (activity) {
        return Object(_actions_js__WEBPACK_IMPORTED_MODULE_7__["stop"])(activity);
      }));
    }))], 2),
        entryActions = _c[0],
        exitActions = _c[1];

    var actions = Object(_actions_js__WEBPACK_IMPORTED_MODULE_7__["toActionObjects"])(exitActions.concat(transition.actions).concat(entryActions), this.machine.options.actions);
    return actions;
  };
  /**
   * Determines the next state given the current `state` and sent `event`.
   *
   * @param state The current State instance or state value
   * @param event The event that was sent at the current state
   * @param context The current context (extended state) of the current state
   */


  StateNode.prototype.transition = function (state, event, context) {
    if (state === void 0) {
      state = this.initialState;
    }

    var _event = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toSCXMLEvent"])(event);

    var currentState;

    if (state instanceof _State_js__WEBPACK_IMPORTED_MODULE_8__["State"]) {
      currentState = context === undefined ? state : this.resolveState(_State_js__WEBPACK_IMPORTED_MODULE_8__["State"].from(state, context));
    } else {
      var resolvedStateValue = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["isString"])(state) ? this.resolve(Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["pathToStateValue"])(this.getResolvedPath(state))) : this.resolve(state);
      var resolvedContext = context ? context : this.machine.context;
      currentState = this.resolveState(_State_js__WEBPACK_IMPORTED_MODULE_8__["State"].from(resolvedStateValue, resolvedContext));
    }

    if (!_environment_js__WEBPACK_IMPORTED_MODULE_2__["IS_PRODUCTION"] && _event.name === WILDCARD) {
      throw new Error("An event cannot have the wildcard type ('" + WILDCARD + "')");
    }

    if (this.strict) {
      if (!this.events.includes(_event.name) && !Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["isBuiltInEvent"])(_event.name)) {
        throw new Error("Machine '" + this.id + "' does not accept event '" + _event.name + "'");
      }
    }

    var stateTransition = this._transition(currentState.value, currentState, _event) || {
      transitions: [],
      configuration: [],
      entrySet: [],
      exitSet: [],
      source: currentState,
      actions: []
    };
    var prevConfig = Object(_stateUtils_js__WEBPACK_IMPORTED_MODULE_5__["getConfiguration"])([], this.getStateNodes(currentState.value));
    var resolvedConfig = stateTransition.configuration.length ? Object(_stateUtils_js__WEBPACK_IMPORTED_MODULE_5__["getConfiguration"])(prevConfig, stateTransition.configuration) : prevConfig;
    stateTransition.configuration = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__spread"])(resolvedConfig);
    return this.resolveTransition(stateTransition, currentState, _event);
  };

  StateNode.prototype.resolveRaisedTransition = function (state, _event, originalEvent) {
    var _a;

    var currentActions = state.actions;
    state = this.transition(state, _event); // Save original event to state
    // TODO: this should be the raised event! Delete in V5 (breaking)

    state._event = originalEvent;
    state.event = originalEvent.data;

    (_a = state.actions).unshift.apply(_a, Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__spread"])(currentActions));

    return state;
  };

  StateNode.prototype.resolveTransition = function (stateTransition, currentState, _event, context) {
    var e_6, _a;

    var _this = this;

    if (_event === void 0) {
      _event = _actions_js__WEBPACK_IMPORTED_MODULE_7__["initEvent"];
    }

    if (context === void 0) {
      context = this.machine.context;
    }

    var configuration = stateTransition.configuration; // Transition will "apply" if:
    // - this is the initial state (there is no current state)
    // - OR there are transitions

    var willTransition = !currentState || stateTransition.transitions.length > 0;
    var resolvedStateValue = willTransition ? Object(_stateUtils_js__WEBPACK_IMPORTED_MODULE_5__["getValue"])(this.machine, configuration) : undefined;
    var historyValue = currentState ? currentState.historyValue ? currentState.historyValue : stateTransition.source ? this.machine.historyValue(currentState.value) : undefined : undefined;
    var currentContext = currentState ? currentState.context : context;
    var actions = this.getActions(stateTransition, currentContext, _event, currentState);
    var activities = currentState ? Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, currentState.activities) : {};

    try {
      for (var actions_1 = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(actions), actions_1_1 = actions_1.next(); !actions_1_1.done; actions_1_1 = actions_1.next()) {
        var action = actions_1_1.value;

        if (action.type === _actionTypes_js__WEBPACK_IMPORTED_MODULE_6__["start"]) {
          activities[action.activity.id || action.activity.type] = action;
        } else if (action.type === _actionTypes_js__WEBPACK_IMPORTED_MODULE_6__["stop"]) {
          activities[action.activity.id || action.activity.type] = false;
        }
      }
    } catch (e_6_1) {
      e_6 = {
        error: e_6_1
      };
    } finally {
      try {
        if (actions_1_1 && !actions_1_1.done && (_a = actions_1.return)) _a.call(actions_1);
      } finally {
        if (e_6) throw e_6.error;
      }
    }

    var _b = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(_actions_js__WEBPACK_IMPORTED_MODULE_7__["resolveActions"])(this, currentState, currentContext, _event, actions), 2),
        resolvedActions = _b[0],
        updatedContext = _b[1];

    var _c = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["partition"])(resolvedActions, function (action) {
      return action.type === _actionTypes_js__WEBPACK_IMPORTED_MODULE_6__["raise"] || action.type === _actionTypes_js__WEBPACK_IMPORTED_MODULE_6__["send"] && action.to === _types_js__WEBPACK_IMPORTED_MODULE_4__["SpecialTargets"].Internal;
    }), 2),
        raisedEvents = _c[0],
        nonRaisedActions = _c[1];

    var invokeActions = resolvedActions.filter(function (action) {
      return action.type === _actionTypes_js__WEBPACK_IMPORTED_MODULE_6__["start"] && action.activity.type === _actionTypes_js__WEBPACK_IMPORTED_MODULE_6__["invoke"];
    });
    var children = invokeActions.reduce(function (acc, action) {
      acc[action.activity.id] = Object(_Actor_js__WEBPACK_IMPORTED_MODULE_9__["createInvocableActor"])(action.activity, _this.machine, updatedContext, _event);
      return acc;
    }, currentState ? Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, currentState.children) : {});
    var resolvedConfiguration = resolvedStateValue ? stateTransition.configuration : currentState ? currentState.configuration : [];
    var meta = resolvedConfiguration.reduce(function (acc, stateNode) {
      if (stateNode.meta !== undefined) {
        acc[stateNode.id] = stateNode.meta;
      }

      return acc;
    }, {});
    var isDone = Object(_stateUtils_js__WEBPACK_IMPORTED_MODULE_5__["isInFinalState"])(resolvedConfiguration, this);
    var nextState = new _State_js__WEBPACK_IMPORTED_MODULE_8__["State"]({
      value: resolvedStateValue || currentState.value,
      context: updatedContext,
      _event: _event,
      // Persist _sessionid between states
      _sessionid: currentState ? currentState._sessionid : null,
      historyValue: resolvedStateValue ? historyValue ? Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["updateHistoryValue"])(historyValue, resolvedStateValue) : undefined : currentState ? currentState.historyValue : undefined,
      history: !resolvedStateValue || stateTransition.source ? currentState : undefined,
      actions: resolvedStateValue ? nonRaisedActions : [],
      activities: resolvedStateValue ? activities : currentState ? currentState.activities : {},
      meta: resolvedStateValue ? meta : currentState ? currentState.meta : undefined,
      events: [],
      configuration: resolvedConfiguration,
      transitions: stateTransition.transitions,
      children: children,
      done: isDone
    });
    var didUpdateContext = currentContext !== updatedContext;
    nextState.changed = _event.name === _actionTypes_js__WEBPACK_IMPORTED_MODULE_6__["update"] || didUpdateContext; // Dispose of penultimate histories to prevent memory leaks

    var history = nextState.history;

    if (history) {
      delete history.history;
    }

    if (!resolvedStateValue) {
      return nextState;
    }

    var maybeNextState = nextState;

    if (!isDone) {
      var isTransient = this._transient || configuration.some(function (stateNode) {
        return stateNode._transient;
      });

      if (isTransient) {
        maybeNextState = this.resolveRaisedTransition(maybeNextState, {
          type: _actionTypes_js__WEBPACK_IMPORTED_MODULE_6__["nullEvent"]
        }, _event);
      }

      while (raisedEvents.length) {
        var raisedEvent = raisedEvents.shift();
        maybeNextState = this.resolveRaisedTransition(maybeNextState, raisedEvent._event, _event);
      }
    } // Detect if state changed


    var changed = maybeNextState.changed || (history ? !!maybeNextState.actions.length || didUpdateContext || typeof history.value !== typeof maybeNextState.value || !Object(_State_js__WEBPACK_IMPORTED_MODULE_8__["stateValuesEqual"])(maybeNextState.value, history.value) : undefined);
    maybeNextState.changed = changed; // Preserve original history after raised events

    maybeNextState.historyValue = nextState.historyValue;
    maybeNextState.history = history;
    return maybeNextState;
  };
  /**
   * Returns the child state node from its relative `stateKey`, or throws.
   */


  StateNode.prototype.getStateNode = function (stateKey) {
    if (isStateId(stateKey)) {
      return this.machine.getStateNodeById(stateKey);
    }

    if (!this.states) {
      throw new Error("Unable to retrieve child state '" + stateKey + "' from '" + this.id + "'; no child states exist.");
    }

    var result = this.states[stateKey];

    if (!result) {
      throw new Error("Child state '" + stateKey + "' does not exist on '" + this.id + "'");
    }

    return result;
  };
  /**
   * Returns the state node with the given `stateId`, or throws.
   *
   * @param stateId The state ID. The prefix "#" is removed.
   */


  StateNode.prototype.getStateNodeById = function (stateId) {
    var resolvedStateId = isStateId(stateId) ? stateId.slice(STATE_IDENTIFIER.length) : stateId;

    if (resolvedStateId === this.id) {
      return this;
    }

    var stateNode = this.machine.idMap[resolvedStateId];

    if (!stateNode) {
      throw new Error("Child state node '#" + resolvedStateId + "' does not exist on machine '" + this.id + "'");
    }

    return stateNode;
  };
  /**
   * Returns the relative state node from the given `statePath`, or throws.
   *
   * @param statePath The string or string array relative path to the state node.
   */


  StateNode.prototype.getStateNodeByPath = function (statePath) {
    if (typeof statePath === 'string' && isStateId(statePath)) {
      try {
        return this.getStateNodeById(statePath.slice(1));
      } catch (e) {// try individual paths
        // throw e;
      }
    }

    var arrayStatePath = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toStatePath"])(statePath, this.delimiter).slice();
    var currentStateNode = this;

    while (arrayStatePath.length) {
      var key = arrayStatePath.shift();

      if (!key.length) {
        break;
      }

      currentStateNode = currentStateNode.getStateNode(key);
    }

    return currentStateNode;
  };
  /**
   * Resolves a partial state value with its full representation in this machine.
   *
   * @param stateValue The partial state value to resolve.
   */


  StateNode.prototype.resolve = function (stateValue) {
    var _a;

    var _this = this;

    if (!stateValue) {
      return this.initialStateValue || EMPTY_OBJECT; // TODO: type-specific properties
    }

    switch (this.type) {
      case 'parallel':
        return Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["mapValues"])(this.initialStateValue, function (subStateValue, subStateKey) {
          return subStateValue ? _this.getStateNode(subStateKey).resolve(stateValue[subStateKey] || subStateValue) : EMPTY_OBJECT;
        });

      case 'compound':
        if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["isString"])(stateValue)) {
          var subStateNode = this.getStateNode(stateValue);

          if (subStateNode.type === 'parallel' || subStateNode.type === 'compound') {
            return _a = {}, _a[stateValue] = subStateNode.initialStateValue, _a;
          }

          return stateValue;
        }

        if (!Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["keys"])(stateValue).length) {
          return this.initialStateValue || {};
        }

        return Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["mapValues"])(stateValue, function (subStateValue, subStateKey) {
          return subStateValue ? _this.getStateNode(subStateKey).resolve(subStateValue) : EMPTY_OBJECT;
        });

      default:
        return stateValue || EMPTY_OBJECT;
    }
  };

  StateNode.prototype.getResolvedPath = function (stateIdentifier) {
    if (isStateId(stateIdentifier)) {
      var stateNode = this.machine.idMap[stateIdentifier.slice(STATE_IDENTIFIER.length)];

      if (!stateNode) {
        throw new Error("Unable to find state node '" + stateIdentifier + "'");
      }

      return stateNode.path;
    }

    return Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toStatePath"])(stateIdentifier, this.delimiter);
  };

  Object.defineProperty(StateNode.prototype, "initialStateValue", {
    get: function () {
      var _a;

      if (this.__cache.initialStateValue) {
        return this.__cache.initialStateValue;
      }

      var initialStateValue;

      if (this.type === 'parallel') {
        initialStateValue = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["mapFilterValues"])(this.states, function (state) {
          return state.initialStateValue || EMPTY_OBJECT;
        }, function (stateNode) {
          return !(stateNode.type === 'history');
        });
      } else if (this.initial !== undefined) {
        if (!this.states[this.initial]) {
          throw new Error("Initial state '" + this.initial + "' not found on '" + this.key + "'");
        }

        initialStateValue = Object(_stateUtils_js__WEBPACK_IMPORTED_MODULE_5__["isLeafNode"])(this.states[this.initial]) ? this.initial : (_a = {}, _a[this.initial] = this.states[this.initial].initialStateValue, _a);
      }

      this.__cache.initialStateValue = initialStateValue;
      return this.__cache.initialStateValue;
    },
    enumerable: false,
    configurable: true
  });

  StateNode.prototype.getInitialState = function (stateValue, context) {
    var configuration = this.getStateNodes(stateValue);
    return this.resolveTransition({
      configuration: configuration,
      entrySet: configuration,
      exitSet: [],
      transitions: [],
      source: undefined,
      actions: []
    }, undefined, undefined, context);
  };

  Object.defineProperty(StateNode.prototype, "initialState", {
    /**
     * The initial State instance, which includes all actions to be executed from
     * entering the initial state.
     */
    get: function () {
      this._init(); // TODO: this should be in the constructor (see note in constructor)


      var initialStateValue = this.initialStateValue;

      if (!initialStateValue) {
        throw new Error("Cannot retrieve initial state from simple state '" + this.id + "'.");
      }

      return this.getInitialState(initialStateValue);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StateNode.prototype, "target", {
    /**
     * The target state value of the history state node, if it exists. This represents the
     * default state value to transition to if no history value exists yet.
     */
    get: function () {
      var target;

      if (this.type === 'history') {
        var historyConfig = this.config;

        if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["isString"])(historyConfig.target)) {
          target = isStateId(historyConfig.target) ? Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["pathToStateValue"])(this.machine.getStateNodeById(historyConfig.target).path.slice(this.path.length - 1)) : historyConfig.target;
        } else {
          target = historyConfig.target;
        }
      }

      return target;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Returns the leaf nodes from a state path relative to this state node.
   *
   * @param relativeStateId The relative state path to retrieve the state nodes
   * @param history The previous state to retrieve history
   * @param resolve Whether state nodes should resolve to initial child state nodes
   */

  StateNode.prototype.getRelativeStateNodes = function (relativeStateId, historyValue, resolve) {
    if (resolve === void 0) {
      resolve = true;
    }

    return resolve ? relativeStateId.type === 'history' ? relativeStateId.resolveHistory(historyValue) : relativeStateId.initialStateNodes : [relativeStateId];
  };

  Object.defineProperty(StateNode.prototype, "initialStateNodes", {
    get: function () {
      var _this = this;

      if (Object(_stateUtils_js__WEBPACK_IMPORTED_MODULE_5__["isLeafNode"])(this)) {
        return [this];
      } // Case when state node is compound but no initial state is defined


      if (this.type === 'compound' && !this.initial) {
        if (!_environment_js__WEBPACK_IMPORTED_MODULE_2__["IS_PRODUCTION"]) {
          Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["warn"])(false, "Compound state node '" + this.id + "' has no initial state.");
        }

        return [this];
      }

      var initialStateNodePaths = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toStatePaths"])(this.initialStateValue);
      return Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["flatten"])(initialStateNodePaths.map(function (initialPath) {
        return _this.getFromRelativePath(initialPath);
      }));
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Retrieves state nodes from a relative path to this state node.
   *
   * @param relativePath The relative path from this state node
   * @param historyValue
   */

  StateNode.prototype.getFromRelativePath = function (relativePath) {
    if (!relativePath.length) {
      return [this];
    }

    var _a = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__read"])(relativePath),
        stateKey = _a[0],
        childStatePath = _a.slice(1);

    if (!this.states) {
      throw new Error("Cannot retrieve subPath '" + stateKey + "' from node with no states");
    }

    var childStateNode = this.getStateNode(stateKey);

    if (childStateNode.type === 'history') {
      return childStateNode.resolveHistory();
    }

    if (!this.states[stateKey]) {
      throw new Error("Child state '" + stateKey + "' does not exist on '" + this.id + "'");
    }

    return this.states[stateKey].getFromRelativePath(childStatePath);
  };

  StateNode.prototype.historyValue = function (relativeStateValue) {
    if (!Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["keys"])(this.states).length) {
      return undefined;
    }

    return {
      current: relativeStateValue || this.initialStateValue,
      states: Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["mapFilterValues"])(this.states, function (stateNode, key) {
        if (!relativeStateValue) {
          return stateNode.historyValue();
        }

        var subStateValue = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["isString"])(relativeStateValue) ? undefined : relativeStateValue[key];
        return stateNode.historyValue(subStateValue || stateNode.initialStateValue);
      }, function (stateNode) {
        return !stateNode.history;
      })
    };
  };
  /**
   * Resolves to the historical value(s) of the parent state node,
   * represented by state nodes.
   *
   * @param historyValue
   */


  StateNode.prototype.resolveHistory = function (historyValue) {
    var _this = this;

    if (this.type !== 'history') {
      return [this];
    }

    var parent = this.parent;

    if (!historyValue) {
      var historyTarget = this.target;
      return historyTarget ? Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["flatten"])(Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toStatePaths"])(historyTarget).map(function (relativeChildPath) {
        return parent.getFromRelativePath(relativeChildPath);
      })) : parent.initialStateNodes;
    }

    var subHistoryValue = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["nestedPath"])(parent.path, 'states')(historyValue).current;

    if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["isString"])(subHistoryValue)) {
      return [parent.getStateNode(subHistoryValue)];
    }

    return Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["flatten"])(Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toStatePaths"])(subHistoryValue).map(function (subStatePath) {
      return _this.history === 'deep' ? parent.getFromRelativePath(subStatePath) : [parent.states[subStatePath[0]]];
    }));
  };

  Object.defineProperty(StateNode.prototype, "stateIds", {
    /**
     * All the state node IDs of this state node and its descendant state nodes.
     */
    get: function () {
      var _this = this;

      var childStateIds = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["flatten"])(Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["keys"])(this.states).map(function (stateKey) {
        return _this.states[stateKey].stateIds;
      }));
      return [this.id].concat(childStateIds);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StateNode.prototype, "events", {
    /**
     * All the event types accepted by this state node and its descendants.
     */
    get: function () {
      var e_7, _a, e_8, _b;

      if (this.__cache.events) {
        return this.__cache.events;
      }

      var states = this.states;
      var events = new Set(this.ownEvents);

      if (states) {
        try {
          for (var _c = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["keys"])(states)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var stateId = _d.value;
            var state = states[stateId];

            if (state.states) {
              try {
                for (var _e = (e_8 = void 0, Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(state.events)), _f = _e.next(); !_f.done; _f = _e.next()) {
                  var event_1 = _f.value;
                  events.add("" + event_1);
                }
              } catch (e_8_1) {
                e_8 = {
                  error: e_8_1
                };
              } finally {
                try {
                  if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                } finally {
                  if (e_8) throw e_8.error;
                }
              }
            }
          }
        } catch (e_7_1) {
          e_7 = {
            error: e_7_1
          };
        } finally {
          try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
          } finally {
            if (e_7) throw e_7.error;
          }
        }
      }

      return this.__cache.events = Array.from(events);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StateNode.prototype, "ownEvents", {
    /**
     * All the events that have transitions directly from this state node.
     *
     * Excludes any inert events.
     */
    get: function () {
      var events = new Set(this.transitions.filter(function (transition) {
        return !(!transition.target && !transition.actions.length && transition.internal);
      }).map(function (transition) {
        return transition.eventType;
      }));
      return Array.from(events);
    },
    enumerable: false,
    configurable: true
  });

  StateNode.prototype.resolveTarget = function (_target) {
    var _this = this;

    if (_target === undefined) {
      // an undefined target signals that the state node should not transition from that state when receiving that event
      return undefined;
    }

    return _target.map(function (target) {
      if (!Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["isString"])(target)) {
        return target;
      }

      var isInternalTarget = target[0] === _this.delimiter; // If internal target is defined on machine,
      // do not include machine key on target

      if (isInternalTarget && !_this.parent) {
        return _this.getStateNodeByPath(target.slice(1));
      }

      var resolvedTarget = isInternalTarget ? _this.key + target : target;

      if (_this.parent) {
        try {
          var targetStateNode = _this.parent.getStateNodeByPath(resolvedTarget);

          return targetStateNode;
        } catch (err) {
          throw new Error("Invalid transition definition for state node '" + _this.id + "':\n" + err.message);
        }
      } else {
        return _this.getStateNodeByPath(resolvedTarget);
      }
    });
  };

  StateNode.prototype.formatTransition = function (transitionConfig) {
    var _this = this;

    var normalizedTarget = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["normalizeTarget"])(transitionConfig.target);
    var internal = 'internal' in transitionConfig ? transitionConfig.internal : normalizedTarget ? normalizedTarget.some(function (_target) {
      return Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["isString"])(_target) && _target[0] === _this.delimiter;
    }) : true;
    var guards = this.machine.options.guards;
    var target = this.resolveTarget(normalizedTarget);

    var transition = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, transitionConfig), {
      actions: Object(_actions_js__WEBPACK_IMPORTED_MODULE_7__["toActionObjects"])(Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toArray"])(transitionConfig.actions)),
      cond: Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toGuard"])(transitionConfig.cond, guards),
      target: target,
      source: this,
      internal: internal,
      eventType: transitionConfig.event,
      toJSON: function () {
        return Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, transition), {
          target: transition.target ? transition.target.map(function (t) {
            return "#" + t.id;
          }) : undefined,
          source: "#" + _this.id
        });
      }
    });

    return transition;
  };

  StateNode.prototype.formatTransitions = function () {
    var e_9, _a;

    var _this = this;

    var onConfig;

    if (!this.config.on) {
      onConfig = [];
    } else if (Array.isArray(this.config.on)) {
      onConfig = this.config.on;
    } else {
      var _b = this.config.on,
          _c = WILDCARD,
          _d = _b[_c],
          wildcardConfigs = _d === void 0 ? [] : _d,
          strictTransitionConfigs_1 = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_b, [typeof _c === "symbol" ? _c : _c + ""]);

      onConfig = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["flatten"])(Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["keys"])(strictTransitionConfigs_1).map(function (key) {
        if (!_environment_js__WEBPACK_IMPORTED_MODULE_2__["IS_PRODUCTION"] && key === NULL_EVENT) {
          Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["warn"])(false, "Empty string transition configs (e.g., `{ on: { '': ... }}`) for transient transitions are deprecated. Specify the transition in the `{ always: ... }` property instead. " + ("Please check the `on` configuration for \"#" + _this.id + "\"."));
        }

        var transitionConfigArray = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toTransitionConfigArray"])(key, strictTransitionConfigs_1[key]);

        if (!_environment_js__WEBPACK_IMPORTED_MODULE_2__["IS_PRODUCTION"]) {
          validateArrayifiedTransitions(_this, key, transitionConfigArray);
        }

        return transitionConfigArray;
      }).concat(Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toTransitionConfigArray"])(WILDCARD, wildcardConfigs)));
    }

    var eventlessConfig = this.config.always ? Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toTransitionConfigArray"])('', this.config.always) : [];
    var doneConfig = this.config.onDone ? Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toTransitionConfigArray"])(String(Object(_actions_js__WEBPACK_IMPORTED_MODULE_7__["done"])(this.id)), this.config.onDone) : [];

    if (!_environment_js__WEBPACK_IMPORTED_MODULE_2__["IS_PRODUCTION"]) {
      Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["warn"])(!(this.config.onDone && !this.parent), "Root nodes cannot have an \".onDone\" transition. Please check the config of \"" + this.id + "\".");
    }

    var invokeConfig = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["flatten"])(this.invoke.map(function (invokeDef) {
      var settleTransitions = [];

      if (invokeDef.onDone) {
        settleTransitions.push.apply(settleTransitions, Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__spread"])(Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toTransitionConfigArray"])(String(Object(_actions_js__WEBPACK_IMPORTED_MODULE_7__["doneInvoke"])(invokeDef.id)), invokeDef.onDone)));
      }

      if (invokeDef.onError) {
        settleTransitions.push.apply(settleTransitions, Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__spread"])(Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toTransitionConfigArray"])(String(Object(_actions_js__WEBPACK_IMPORTED_MODULE_7__["error"])(invokeDef.id)), invokeDef.onError)));
      }

      return settleTransitions;
    }));
    var delayedTransitions = this.after;
    var formattedTransitions = Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["flatten"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__spread"])(doneConfig, invokeConfig, onConfig, eventlessConfig).map(function (transitionConfig) {
      return Object(_utils_js__WEBPACK_IMPORTED_MODULE_3__["toArray"])(transitionConfig).map(function (transition) {
        return _this.formatTransition(transition);
      });
    }));

    try {
      for (var delayedTransitions_1 = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(delayedTransitions), delayedTransitions_1_1 = delayedTransitions_1.next(); !delayedTransitions_1_1.done; delayedTransitions_1_1 = delayedTransitions_1.next()) {
        var delayedTransition = delayedTransitions_1_1.value;
        formattedTransitions.push(delayedTransition);
      }
    } catch (e_9_1) {
      e_9 = {
        error: e_9_1
      };
    } finally {
      try {
        if (delayedTransitions_1_1 && !delayedTransitions_1_1.done && (_a = delayedTransitions_1.return)) _a.call(delayedTransitions_1);
      } finally {
        if (e_9) throw e_9.error;
      }
    }

    return formattedTransitions;
  };

  return StateNode;
}();



/***/ }),

/***/ "./node_modules/xstate/es/_virtual/_tslib.js":
/*!***************************************************!*\
  !*** ./node_modules/xstate/es/_virtual/_tslib.js ***!
  \***************************************************/
/*! exports provided: __assign, __read, __rest, __spread, __values */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}

function __values(o) {
  var m = typeof Symbol === "function" && o[Symbol.iterator],
      i = 0;
  if (m) return m.call(o);
  return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}

function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

  return ar;
}



/***/ }),

/***/ "./node_modules/xstate/es/actionTypes.js":
/*!***********************************************!*\
  !*** ./node_modules/xstate/es/actionTypes.js ***!
  \***********************************************/
/*! exports provided: after, assign, cancel, choose, doneState, error, errorExecution, errorPlatform, init, invoke, log, nullEvent, pure, raise, send, start, stop, update */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "after", function() { return after; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cancel", function() { return cancel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "choose", function() { return choose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "doneState", function() { return doneState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "error", function() { return error; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorExecution", function() { return errorExecution; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorPlatform", function() { return errorPlatform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invoke", function() { return invoke; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nullEvent", function() { return nullEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pure", function() { return pure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raise", function() { return raise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "send", function() { return send; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "start", function() { return start; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stop", function() { return stop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.js */ "./node_modules/xstate/es/types.js");
 // xstate-specific action types

var start = _types_js__WEBPACK_IMPORTED_MODULE_0__["ActionTypes"].Start;
var stop = _types_js__WEBPACK_IMPORTED_MODULE_0__["ActionTypes"].Stop;
var raise = _types_js__WEBPACK_IMPORTED_MODULE_0__["ActionTypes"].Raise;
var send = _types_js__WEBPACK_IMPORTED_MODULE_0__["ActionTypes"].Send;
var cancel = _types_js__WEBPACK_IMPORTED_MODULE_0__["ActionTypes"].Cancel;
var nullEvent = _types_js__WEBPACK_IMPORTED_MODULE_0__["ActionTypes"].NullEvent;
var assign = _types_js__WEBPACK_IMPORTED_MODULE_0__["ActionTypes"].Assign;
var after = _types_js__WEBPACK_IMPORTED_MODULE_0__["ActionTypes"].After;
var doneState = _types_js__WEBPACK_IMPORTED_MODULE_0__["ActionTypes"].DoneState;
var log = _types_js__WEBPACK_IMPORTED_MODULE_0__["ActionTypes"].Log;
var init = _types_js__WEBPACK_IMPORTED_MODULE_0__["ActionTypes"].Init;
var invoke = _types_js__WEBPACK_IMPORTED_MODULE_0__["ActionTypes"].Invoke;
var errorExecution = _types_js__WEBPACK_IMPORTED_MODULE_0__["ActionTypes"].ErrorExecution;
var errorPlatform = _types_js__WEBPACK_IMPORTED_MODULE_0__["ActionTypes"].ErrorPlatform;
var error = _types_js__WEBPACK_IMPORTED_MODULE_0__["ActionTypes"].ErrorCustom;
var update = _types_js__WEBPACK_IMPORTED_MODULE_0__["ActionTypes"].Update;
var choose = _types_js__WEBPACK_IMPORTED_MODULE_0__["ActionTypes"].Choose;
var pure = _types_js__WEBPACK_IMPORTED_MODULE_0__["ActionTypes"].Pure;


/***/ }),

/***/ "./node_modules/xstate/es/actions.js":
/*!*******************************************!*\
  !*** ./node_modules/xstate/es/actions.js ***!
  \*******************************************/
/*! exports provided: after, assign, cancel, choose, done, doneInvoke, error, escalate, forwardTo, getActionFunction, initEvent, log, pure, raise, resolveActions, resolveLog, resolveRaise, resolveSend, respond, send, sendParent, sendUpdate, start, stop, toActionObject, toActionObjects, toActivityDefinition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "after", function() { return after; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cancel", function() { return cancel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "choose", function() { return choose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "done", function() { return done; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "doneInvoke", function() { return doneInvoke; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "error", function() { return error; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escalate", function() { return escalate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forwardTo", function() { return forwardTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getActionFunction", function() { return getActionFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initEvent", function() { return initEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pure", function() { return pure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raise", function() { return raise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveActions", function() { return resolveActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveLog", function() { return resolveLog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveRaise", function() { return resolveRaise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveSend", function() { return resolveSend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "respond", function() { return respond; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "send", function() { return send; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendParent", function() { return sendParent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendUpdate", function() { return sendUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "start", function() { return start; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stop", function() { return stop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toActionObject", function() { return toActionObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toActionObjects", function() { return toActionObjects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toActivityDefinition", function() { return toActivityDefinition; });
/* harmony import */ var _virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_virtual/_tslib.js */ "./node_modules/xstate/es/_virtual/_tslib.js");
/* harmony import */ var _environment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environment.js */ "./node_modules/xstate/es/environment.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/xstate/es/utils.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types.js */ "./node_modules/xstate/es/types.js");
/* harmony import */ var _actionTypes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actionTypes.js */ "./node_modules/xstate/es/actionTypes.js");





var initEvent = /*#__PURE__*/Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["toSCXMLEvent"])({
  type: _actionTypes_js__WEBPACK_IMPORTED_MODULE_4__["init"]
});

function getActionFunction(actionType, actionFunctionMap) {
  return actionFunctionMap ? actionFunctionMap[actionType] || undefined : undefined;
}

function toActionObject(action, actionFunctionMap) {
  var actionObject;

  if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isString"])(action) || typeof action === 'number') {
    var exec = getActionFunction(action, actionFunctionMap);

    if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(exec)) {
      actionObject = {
        type: action,
        exec: exec
      };
    } else if (exec) {
      actionObject = exec;
    } else {
      actionObject = {
        type: action,
        exec: undefined
      };
    }
  } else if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(action)) {
    actionObject = {
      // Convert action to string if unnamed
      type: action.name || action.toString(),
      exec: action
    };
  } else {
    var exec = getActionFunction(action.type, actionFunctionMap);

    if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(exec)) {
      actionObject = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, action), {
        exec: exec
      });
    } else if (exec) {
      var actionType = exec.type || action.type;
      actionObject = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, exec), action), {
        type: actionType
      });
    } else {
      actionObject = action;
    }
  }

  Object.defineProperty(actionObject, 'toString', {
    value: function () {
      return actionObject.type;
    },
    enumerable: false,
    configurable: true
  });
  return actionObject;
}

var toActionObjects = function (action, actionFunctionMap) {
  if (!action) {
    return [];
  }

  var actions = Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isArray"])(action) ? action : [action];
  return actions.map(function (subAction) {
    return toActionObject(subAction, actionFunctionMap);
  });
};

function toActivityDefinition(action) {
  var actionObject = toActionObject(action);
  return Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({
    id: Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isString"])(action) ? action : actionObject.id
  }, actionObject), {
    type: actionObject.type
  });
}
/**
 * Raises an event. This places the event in the internal event queue, so that
 * the event is immediately consumed by the machine in the current step.
 *
 * @param eventType The event to raise.
 */


function raise(event) {
  if (!Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isString"])(event)) {
    return send(event, {
      to: _types_js__WEBPACK_IMPORTED_MODULE_3__["SpecialTargets"].Internal
    });
  }

  return {
    type: _actionTypes_js__WEBPACK_IMPORTED_MODULE_4__["raise"],
    event: event
  };
}

function resolveRaise(action) {
  return {
    type: _actionTypes_js__WEBPACK_IMPORTED_MODULE_4__["raise"],
    _event: Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["toSCXMLEvent"])(action.event)
  };
}
/**
 * Sends an event. This returns an action that will be read by an interpreter to
 * send the event in the next step, after the current step is finished executing.
 *
 * @param event The event to send.
 * @param options Options to pass into the send event:
 *  - `id` - The unique send event identifier (used with `cancel()`).
 *  - `delay` - The number of milliseconds to delay the sending of the event.
 *  - `to` - The target of this event (by default, the machine the event was sent from).
 */


function send(event, options) {
  return {
    to: options ? options.to : undefined,
    type: _actionTypes_js__WEBPACK_IMPORTED_MODULE_4__["send"],
    event: Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(event) ? event : Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["toEventObject"])(event),
    delay: options ? options.delay : undefined,
    id: options && options.id !== undefined ? options.id : Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(event) ? event.name : Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["getEventType"])(event)
  };
}

function resolveSend(action, ctx, _event, delaysMap) {
  var meta = {
    _event: _event
  }; // TODO: helper function for resolving Expr

  var resolvedEvent = Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["toSCXMLEvent"])(Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(action.event) ? action.event(ctx, _event.data, meta) : action.event);
  var resolvedDelay;

  if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isString"])(action.delay)) {
    var configDelay = delaysMap && delaysMap[action.delay];
    resolvedDelay = Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(configDelay) ? configDelay(ctx, _event.data, meta) : configDelay;
  } else {
    resolvedDelay = Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(action.delay) ? action.delay(ctx, _event.data, meta) : action.delay;
  }

  var resolvedTarget = Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(action.to) ? action.to(ctx, _event.data, meta) : action.to;
  return Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, action), {
    to: resolvedTarget,
    _event: resolvedEvent,
    event: resolvedEvent.data,
    delay: resolvedDelay
  });
}
/**
 * Sends an event to this machine's parent.
 *
 * @param event The event to send to the parent machine.
 * @param options Options to pass into the send event.
 */


function sendParent(event, options) {
  return send(event, Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), {
    to: _types_js__WEBPACK_IMPORTED_MODULE_3__["SpecialTargets"].Parent
  }));
}
/**
 * Sends an update event to this machine's parent.
 */


function sendUpdate() {
  return sendParent(_actionTypes_js__WEBPACK_IMPORTED_MODULE_4__["update"]);
}
/**
 * Sends an event back to the sender of the original event.
 *
 * @param event The event to send back to the sender
 * @param options Options to pass into the send event
 */


function respond(event, options) {
  return send(event, Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), {
    to: function (_, __, _a) {
      var _event = _a._event;
      return _event.origin; // TODO: handle when _event.origin is undefined
    }
  }));
}

var defaultLogExpr = function (context, event) {
  return {
    context: context,
    event: event
  };
};
/**
 *
 * @param expr The expression function to evaluate which will be logged.
 *  Takes in 2 arguments:
 *  - `ctx` - the current state context
 *  - `event` - the event that caused this action to be executed.
 * @param label The label to give to the logged expression.
 */


function log(expr, label) {
  if (expr === void 0) {
    expr = defaultLogExpr;
  }

  return {
    type: _actionTypes_js__WEBPACK_IMPORTED_MODULE_4__["log"],
    label: label,
    expr: expr
  };
}

var resolveLog = function (action, ctx, _event) {
  return Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, action), {
    value: Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isString"])(action.expr) ? action.expr : action.expr(ctx, _event.data, {
      _event: _event
    })
  });
};
/**
 * Cancels an in-flight `send(...)` action. A canceled sent action will not
 * be executed, nor will its event be sent, unless it has already been sent
 * (e.g., if `cancel(...)` is called after the `send(...)` action's `delay`).
 *
 * @param sendId The `id` of the `send(...)` action to cancel.
 */


var cancel = function (sendId) {
  return {
    type: _actionTypes_js__WEBPACK_IMPORTED_MODULE_4__["cancel"],
    sendId: sendId
  };
};
/**
 * Starts an activity.
 *
 * @param activity The activity to start.
 */


function start(activity) {
  var activityDef = toActivityDefinition(activity);
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_3__["ActionTypes"].Start,
    activity: activityDef,
    exec: undefined
  };
}
/**
 * Stops an activity.
 *
 * @param activity The activity to stop.
 */


function stop(activity) {
  var activityDef = toActivityDefinition(activity);
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_3__["ActionTypes"].Stop,
    activity: activityDef,
    exec: undefined
  };
}
/**
 * Updates the current context of the machine.
 *
 * @param assignment An object that represents the partial context to update.
 */


var assign = function (assignment) {
  return {
    type: _actionTypes_js__WEBPACK_IMPORTED_MODULE_4__["assign"],
    assignment: assignment
  };
};
/**
 * Returns an event type that represents an implicit event that
 * is sent after the specified `delay`.
 *
 * @param delayRef The delay in milliseconds
 * @param id The state node ID where this event is handled
 */


function after(delayRef, id) {
  var idSuffix = id ? "#" + id : '';
  return _types_js__WEBPACK_IMPORTED_MODULE_3__["ActionTypes"].After + "(" + delayRef + ")" + idSuffix;
}
/**
 * Returns an event that represents that a final state node
 * has been reached in the parent state node.
 *
 * @param id The final state node's parent state node `id`
 * @param data The data to pass into the event
 */


function done(id, data) {
  var type = _types_js__WEBPACK_IMPORTED_MODULE_3__["ActionTypes"].DoneState + "." + id;
  var eventObject = {
    type: type,
    data: data
  };

  eventObject.toString = function () {
    return type;
  };

  return eventObject;
}
/**
 * Returns an event that represents that an invoked service has terminated.
 *
 * An invoked service is terminated when it has reached a top-level final state node,
 * but not when it is canceled.
 *
 * @param id The final state node ID
 * @param data The data to pass into the event
 */


function doneInvoke(id, data) {
  var type = _types_js__WEBPACK_IMPORTED_MODULE_3__["ActionTypes"].DoneInvoke + "." + id;
  var eventObject = {
    type: type,
    data: data
  };

  eventObject.toString = function () {
    return type;
  };

  return eventObject;
}

function error(id, data) {
  var type = _types_js__WEBPACK_IMPORTED_MODULE_3__["ActionTypes"].ErrorPlatform + "." + id;
  var eventObject = {
    type: type,
    data: data
  };

  eventObject.toString = function () {
    return type;
  };

  return eventObject;
}

function pure(getActions) {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_3__["ActionTypes"].Pure,
    get: getActions
  };
}
/**
 * Forwards (sends) an event to a specified service.
 *
 * @param target The target service to forward the event to.
 * @param options Options to pass into the send action creator.
 */


function forwardTo(target, options) {
  return send(function (_, event) {
    return event;
  }, Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), {
    to: target
  }));
}
/**
 * Escalates an error by sending it as an event to this machine's parent.
 *
 * @param errorData The error data to send, or the expression function that
 * takes in the `context`, `event`, and `meta`, and returns the error data to send.
 * @param options Options to pass into the send action creator.
 */


function escalate(errorData, options) {
  return sendParent(function (context, event, meta) {
    return {
      type: _actionTypes_js__WEBPACK_IMPORTED_MODULE_4__["error"],
      data: Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(errorData) ? errorData(context, event, meta) : errorData
    };
  }, Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), {
    to: _types_js__WEBPACK_IMPORTED_MODULE_3__["SpecialTargets"].Parent
  }));
}

function choose(conds) {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_3__["ActionTypes"].Choose,
    conds: conds
  };
}

function resolveActions(machine, currentState, currentContext, _event, actions) {
  var _a = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["partition"])(actions, function (action) {
    return action.type === _actionTypes_js__WEBPACK_IMPORTED_MODULE_4__["assign"];
  }), 2),
      assignActions = _a[0],
      otherActions = _a[1];

  var updatedContext = assignActions.length ? Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["updateContext"])(currentContext, _event, assignActions, currentState) : currentContext;
  var resolvedActions = Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["flatten"])(otherActions.map(function (actionObject) {
    var _a;

    switch (actionObject.type) {
      case _actionTypes_js__WEBPACK_IMPORTED_MODULE_4__["raise"]:
        return resolveRaise(actionObject);

      case _actionTypes_js__WEBPACK_IMPORTED_MODULE_4__["send"]:
        var sendAction = resolveSend(actionObject, updatedContext, _event, machine.options.delays); // TODO: fix ActionTypes.Init

        if (!_environment_js__WEBPACK_IMPORTED_MODULE_1__["IS_PRODUCTION"]) {
          // warn after resolving as we can create better contextual message here
          Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["warn"])(!Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isString"])(actionObject.delay) || typeof sendAction.delay === 'number', // tslint:disable-next-line:max-line-length
          "No delay reference for delay expression '" + actionObject.delay + "' was found on machine '" + machine.id + "'");
        }

        return sendAction;

      case _actionTypes_js__WEBPACK_IMPORTED_MODULE_4__["log"]:
        return resolveLog(actionObject, updatedContext, _event);

      case _actionTypes_js__WEBPACK_IMPORTED_MODULE_4__["choose"]:
        {
          var chooseAction = actionObject;
          var matchedActions = (_a = chooseAction.conds.find(function (condition) {
            var guard = Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["toGuard"])(condition.cond, machine.options.guards);
            return !guard || Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["evaluateGuard"])(machine, guard, updatedContext, _event, currentState);
          })) === null || _a === void 0 ? void 0 : _a.actions;

          if (!matchedActions) {
            return [];
          }

          var resolved = resolveActions(machine, currentState, updatedContext, _event, toActionObjects(Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["toArray"])(matchedActions), machine.options.actions));
          updatedContext = resolved[1];
          return resolved[0];
        }

      case _actionTypes_js__WEBPACK_IMPORTED_MODULE_4__["pure"]:
        {
          var matchedActions = actionObject.get(updatedContext, _event.data);

          if (!matchedActions) {
            return [];
          }

          var resolved = resolveActions(machine, currentState, updatedContext, _event, toActionObjects(Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["toArray"])(matchedActions), machine.options.actions));
          updatedContext = resolved[1];
          return resolved[0];
        }

      default:
        return toActionObject(actionObject, machine.options.actions);
    }
  }));
  return [resolvedActions, updatedContext];
}



/***/ }),

/***/ "./node_modules/xstate/es/constants.js":
/*!*********************************************!*\
  !*** ./node_modules/xstate/es/constants.js ***!
  \*********************************************/
/*! exports provided: DEFAULT_GUARD_TYPE, EMPTY_ACTIVITY_MAP, STATE_DELIMITER, TARGETLESS_KEY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_GUARD_TYPE", function() { return DEFAULT_GUARD_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMPTY_ACTIVITY_MAP", function() { return EMPTY_ACTIVITY_MAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATE_DELIMITER", function() { return STATE_DELIMITER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TARGETLESS_KEY", function() { return TARGETLESS_KEY; });
var STATE_DELIMITER = '.';
var EMPTY_ACTIVITY_MAP = {};
var DEFAULT_GUARD_TYPE = 'xstate.guard';
var TARGETLESS_KEY = '';


/***/ }),

/***/ "./node_modules/xstate/es/devTools.js":
/*!********************************************!*\
  !*** ./node_modules/xstate/es/devTools.js ***!
  \********************************************/
/*! exports provided: registerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerService", function() { return registerService; });
/* harmony import */ var _environment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./environment.js */ "./node_modules/xstate/es/environment.js");


function getDevTools() {
  var w = window;

  if (!!w.__xstate__) {
    return w.__xstate__;
  }

  return undefined;
}

function registerService(service) {
  if (_environment_js__WEBPACK_IMPORTED_MODULE_0__["IS_PRODUCTION"] || typeof window === 'undefined') {
    return;
  }

  var devTools = getDevTools();

  if (devTools) {
    devTools.register(service);
  }
}



/***/ }),

/***/ "./node_modules/xstate/es/environment.js":
/*!***********************************************!*\
  !*** ./node_modules/xstate/es/environment.js ***!
  \***********************************************/
/*! exports provided: IS_PRODUCTION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IS_PRODUCTION", function() { return IS_PRODUCTION; });
var IS_PRODUCTION = "development" === 'production';


/***/ }),

/***/ "./node_modules/xstate/es/index.js":
/*!*****************************************!*\
  !*** ./node_modules/xstate/es/index.js ***!
  \*****************************************/
/*! exports provided: matchesState, mapState, ActionTypes, SpecialTargets, assign, doneInvoke, forwardTo, send, sendParent, sendUpdate, State, StateNode, Machine, createMachine, Interpreter, interpret, spawn, matchState, actions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/xstate/es/utils.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "matchesState", function() { return _utils_js__WEBPACK_IMPORTED_MODULE_0__["matchesState"]; });

/* harmony import */ var _mapState_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mapState.js */ "./node_modules/xstate/es/mapState.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return _mapState_js__WEBPACK_IMPORTED_MODULE_1__["mapState"]; });

/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types.js */ "./node_modules/xstate/es/types.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ActionTypes", function() { return _types_js__WEBPACK_IMPORTED_MODULE_2__["ActionTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SpecialTargets", function() { return _types_js__WEBPACK_IMPORTED_MODULE_2__["SpecialTargets"]; });

/* harmony import */ var _actions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions.js */ "./node_modules/xstate/es/actions.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return _actions_js__WEBPACK_IMPORTED_MODULE_3__["assign"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "doneInvoke", function() { return _actions_js__WEBPACK_IMPORTED_MODULE_3__["doneInvoke"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forwardTo", function() { return _actions_js__WEBPACK_IMPORTED_MODULE_3__["forwardTo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "send", function() { return _actions_js__WEBPACK_IMPORTED_MODULE_3__["send"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sendParent", function() { return _actions_js__WEBPACK_IMPORTED_MODULE_3__["sendParent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sendUpdate", function() { return _actions_js__WEBPACK_IMPORTED_MODULE_3__["sendUpdate"]; });

/* harmony import */ var _State_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./State.js */ "./node_modules/xstate/es/State.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "State", function() { return _State_js__WEBPACK_IMPORTED_MODULE_4__["State"]; });

/* harmony import */ var _StateNode_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./StateNode.js */ "./node_modules/xstate/es/StateNode.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StateNode", function() { return _StateNode_js__WEBPACK_IMPORTED_MODULE_5__["StateNode"]; });

/* harmony import */ var _Machine_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Machine.js */ "./node_modules/xstate/es/Machine.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Machine", function() { return _Machine_js__WEBPACK_IMPORTED_MODULE_6__["Machine"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createMachine", function() { return _Machine_js__WEBPACK_IMPORTED_MODULE_6__["createMachine"]; });

/* harmony import */ var _interpreter_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./interpreter.js */ "./node_modules/xstate/es/interpreter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Interpreter", function() { return _interpreter_js__WEBPACK_IMPORTED_MODULE_7__["Interpreter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpret", function() { return _interpreter_js__WEBPACK_IMPORTED_MODULE_7__["interpret"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "spawn", function() { return _interpreter_js__WEBPACK_IMPORTED_MODULE_7__["spawn"]; });

/* harmony import */ var _match_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./match.js */ "./node_modules/xstate/es/match.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "matchState", function() { return _match_js__WEBPACK_IMPORTED_MODULE_8__["matchState"]; });











var actions = {
  raise: _actions_js__WEBPACK_IMPORTED_MODULE_3__["raise"],
  send: _actions_js__WEBPACK_IMPORTED_MODULE_3__["send"],
  sendParent: _actions_js__WEBPACK_IMPORTED_MODULE_3__["sendParent"],
  sendUpdate: _actions_js__WEBPACK_IMPORTED_MODULE_3__["sendUpdate"],
  log: _actions_js__WEBPACK_IMPORTED_MODULE_3__["log"],
  cancel: _actions_js__WEBPACK_IMPORTED_MODULE_3__["cancel"],
  start: _actions_js__WEBPACK_IMPORTED_MODULE_3__["start"],
  stop: _actions_js__WEBPACK_IMPORTED_MODULE_3__["stop"],
  assign: _actions_js__WEBPACK_IMPORTED_MODULE_3__["assign"],
  after: _actions_js__WEBPACK_IMPORTED_MODULE_3__["after"],
  done: _actions_js__WEBPACK_IMPORTED_MODULE_3__["done"],
  respond: _actions_js__WEBPACK_IMPORTED_MODULE_3__["respond"],
  forwardTo: _actions_js__WEBPACK_IMPORTED_MODULE_3__["forwardTo"],
  escalate: _actions_js__WEBPACK_IMPORTED_MODULE_3__["escalate"],
  choose: _actions_js__WEBPACK_IMPORTED_MODULE_3__["choose"],
  pure: _actions_js__WEBPACK_IMPORTED_MODULE_3__["pure"]
};


/***/ }),

/***/ "./node_modules/xstate/es/interpreter.js":
/*!***********************************************!*\
  !*** ./node_modules/xstate/es/interpreter.js ***!
  \***********************************************/
/*! exports provided: Interpreter, interpret, spawn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Interpreter", function() { return Interpreter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interpret", function() { return interpret; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spawn", function() { return spawn; });
/* harmony import */ var _virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_virtual/_tslib.js */ "./node_modules/xstate/es/_virtual/_tslib.js");
/* harmony import */ var _environment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environment.js */ "./node_modules/xstate/es/environment.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/xstate/es/utils.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types.js */ "./node_modules/xstate/es/types.js");
/* harmony import */ var _stateUtils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stateUtils.js */ "./node_modules/xstate/es/stateUtils.js");
/* harmony import */ var _actionTypes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./actionTypes.js */ "./node_modules/xstate/es/actionTypes.js");
/* harmony import */ var _actions_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./actions.js */ "./node_modules/xstate/es/actions.js");
/* harmony import */ var _State_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./State.js */ "./node_modules/xstate/es/State.js");
/* harmony import */ var _serviceScope_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./serviceScope.js */ "./node_modules/xstate/es/serviceScope.js");
/* harmony import */ var _Actor_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Actor.js */ "./node_modules/xstate/es/Actor.js");
/* harmony import */ var _scheduler_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./scheduler.js */ "./node_modules/xstate/es/scheduler.js");
/* harmony import */ var _registry_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./registry.js */ "./node_modules/xstate/es/registry.js");
/* harmony import */ var _devTools_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./devTools.js */ "./node_modules/xstate/es/devTools.js");













var DEFAULT_SPAWN_OPTIONS = {
  sync: false,
  autoForward: false
};
var InterpreterStatus;

(function (InterpreterStatus) {
  InterpreterStatus[InterpreterStatus["NotStarted"] = 0] = "NotStarted";
  InterpreterStatus[InterpreterStatus["Running"] = 1] = "Running";
  InterpreterStatus[InterpreterStatus["Stopped"] = 2] = "Stopped";
})(InterpreterStatus || (InterpreterStatus = {}));

var Interpreter =
/*#__PURE__*/

/** @class */
function () {
  /**
   * Creates a new Interpreter instance (i.e., service) for the given machine with the provided options, if any.
   *
   * @param machine The machine to be interpreted
   * @param options Interpreter options
   */
  function Interpreter(machine, options) {
    var _this = this;

    if (options === void 0) {
      options = Interpreter.defaultOptions;
    }

    this.machine = machine;
    this.scheduler = new _scheduler_js__WEBPACK_IMPORTED_MODULE_10__["Scheduler"]();
    this.delayedEventsMap = {};
    this.listeners = new Set();
    this.contextListeners = new Set();
    this.stopListeners = new Set();
    this.doneListeners = new Set();
    this.eventListeners = new Set();
    this.sendListeners = new Set();
    /**
     * Whether the service is started.
     */

    this.initialized = false;
    this._status = InterpreterStatus.NotStarted;
    this.children = new Map();
    this.forwardTo = new Set();
    /**
     * Alias for Interpreter.prototype.start
     */

    this.init = this.start;
    /**
     * Sends an event to the running interpreter to trigger a transition.
     *
     * An array of events (batched) can be sent as well, which will send all
     * batched events to the running interpreter. The listeners will be
     * notified only **once** when all events are processed.
     *
     * @param event The event(s) to send
     */

    this.send = function (event, payload) {
      if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isArray"])(event)) {
        _this.batch(event);

        return _this.state;
      }

      var _event = Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["toSCXMLEvent"])(Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["toEventObject"])(event, payload));

      if (_this._status === InterpreterStatus.Stopped) {
        // do nothing
        if (!_environment_js__WEBPACK_IMPORTED_MODULE_1__["IS_PRODUCTION"]) {
          Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["warn"])(false, "Event \"" + _event.name + "\" was sent to stopped service \"" + _this.machine.id + "\". This service has already reached its final state, and will not transition.\nEvent: " + JSON.stringify(_event.data));
        }

        return _this.state;
      }

      if (_this._status === InterpreterStatus.NotStarted && _this.options.deferEvents) {
        // tslint:disable-next-line:no-console
        if (!_environment_js__WEBPACK_IMPORTED_MODULE_1__["IS_PRODUCTION"]) {
          Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["warn"])(false, "Event \"" + _event.name + "\" was sent to uninitialized service \"" + _this.machine.id + "\" and is deferred. Make sure .start() is called for this service.\nEvent: " + JSON.stringify(_event.data));
        }
      } else if (_this._status !== InterpreterStatus.Running) {
        throw new Error("Event \"" + _event.name + "\" was sent to uninitialized service \"" + _this.machine.id + "\". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.\nEvent: " + JSON.stringify(_event.data));
      }

      _this.scheduler.schedule(function () {
        // Forward copy of event to child actors
        _this.forward(_event);

        var nextState = _this.nextState(_event);

        _this.update(nextState, _event);
      });

      return _this._state; // TODO: deprecate (should return void)
      // tslint:disable-next-line:semicolon
    };

    this.sendTo = function (event, to) {
      var isParent = _this.parent && (to === _types_js__WEBPACK_IMPORTED_MODULE_3__["SpecialTargets"].Parent || _this.parent.id === to);
      var target = isParent ? _this.parent : Object(_Actor_js__WEBPACK_IMPORTED_MODULE_9__["isActor"])(to) ? to : _this.children.get(to) || _registry_js__WEBPACK_IMPORTED_MODULE_11__["registry"].get(to);

      if (!target) {
        if (!isParent) {
          throw new Error("Unable to send event to child '" + to + "' from service '" + _this.id + "'.");
        } // tslint:disable-next-line:no-console


        if (!_environment_js__WEBPACK_IMPORTED_MODULE_1__["IS_PRODUCTION"]) {
          Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["warn"])(false, "Service '" + _this.id + "' has no parent: unable to send event " + event.type);
        }

        return;
      }

      if ('machine' in target) {
        // Send SCXML events to machines
        target.send(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, event), {
          name: event.name === _actionTypes_js__WEBPACK_IMPORTED_MODULE_5__["error"] ? "" + Object(_actions_js__WEBPACK_IMPORTED_MODULE_6__["error"])(_this.id) : event.name,
          origin: _this.sessionId
        }));
      } else {
        // Send normal events to other targets
        target.send(event.data);
      }
    };

    var resolvedOptions = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, Interpreter.defaultOptions), options);

    var clock = resolvedOptions.clock,
        logger = resolvedOptions.logger,
        parent = resolvedOptions.parent,
        id = resolvedOptions.id;
    var resolvedId = id !== undefined ? id : machine.id;
    this.id = resolvedId;
    this.logger = logger;
    this.clock = clock;
    this.parent = parent;
    this.options = resolvedOptions;
    this.scheduler = new _scheduler_js__WEBPACK_IMPORTED_MODULE_10__["Scheduler"]({
      deferEvents: this.options.deferEvents
    });
    this.sessionId = _registry_js__WEBPACK_IMPORTED_MODULE_11__["registry"].bookId();
  }

  Object.defineProperty(Interpreter.prototype, "initialState", {
    get: function () {
      var _this = this;

      if (this._initialState) {
        return this._initialState;
      }

      return Object(_serviceScope_js__WEBPACK_IMPORTED_MODULE_8__["provide"])(this, function () {
        _this._initialState = _this.machine.initialState;
        return _this._initialState;
      });
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Interpreter.prototype, "state", {
    get: function () {
      if (!_environment_js__WEBPACK_IMPORTED_MODULE_1__["IS_PRODUCTION"]) {
        Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["warn"])(this._status !== InterpreterStatus.NotStarted, "Attempted to read state from uninitialized service '" + this.id + "'. Make sure the service is started first.");
      }

      return this._state;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Executes the actions of the given state, with that state's `context` and `event`.
   *
   * @param state The state whose actions will be executed
   * @param actionsConfig The action implementations to use
   */

  Interpreter.prototype.execute = function (state, actionsConfig) {
    var e_1, _a;

    try {
      for (var _b = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(state.actions), _c = _b.next(); !_c.done; _c = _b.next()) {
        var action = _c.value;
        this.exec(action, state, actionsConfig);
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };

  Interpreter.prototype.update = function (state, _event) {
    var e_2, _a, e_3, _b, e_4, _c, e_5, _d;

    var _this = this; // Attach session ID to state


    state._sessionid = this.sessionId; // Update state

    this._state = state; // Execute actions

    if (this.options.execute) {
      this.execute(this.state);
    } // Dev tools


    if (this.devTools) {
      this.devTools.send(_event.data, state);
    } // Execute listeners


    if (state.event) {
      try {
        for (var _e = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.eventListeners), _f = _e.next(); !_f.done; _f = _e.next()) {
          var listener = _f.value;
          listener(state.event);
        }
      } catch (e_2_1) {
        e_2 = {
          error: e_2_1
        };
      } finally {
        try {
          if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
        } finally {
          if (e_2) throw e_2.error;
        }
      }
    }

    try {
      for (var _g = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.listeners), _h = _g.next(); !_h.done; _h = _g.next()) {
        var listener = _h.value;
        listener(state, state.event);
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1
      };
    } finally {
      try {
        if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
      } finally {
        if (e_3) throw e_3.error;
      }
    }

    try {
      for (var _j = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.contextListeners), _k = _j.next(); !_k.done; _k = _j.next()) {
        var contextListener = _k.value;
        contextListener(this.state.context, this.state.history ? this.state.history.context : undefined);
      }
    } catch (e_4_1) {
      e_4 = {
        error: e_4_1
      };
    } finally {
      try {
        if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
      } finally {
        if (e_4) throw e_4.error;
      }
    }

    var isDone = Object(_stateUtils_js__WEBPACK_IMPORTED_MODULE_4__["isInFinalState"])(state.configuration || [], this.machine);

    if (this.state.configuration && isDone) {
      // get final child state node
      var finalChildStateNode = state.configuration.find(function (sn) {
        return sn.type === 'final' && sn.parent === _this.machine;
      });
      var doneData = finalChildStateNode && finalChildStateNode.doneData ? Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["mapContext"])(finalChildStateNode.doneData, state.context, _event) : undefined;

      try {
        for (var _l = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.doneListeners), _m = _l.next(); !_m.done; _m = _l.next()) {
          var listener = _m.value;
          listener(Object(_actions_js__WEBPACK_IMPORTED_MODULE_6__["doneInvoke"])(this.id, doneData));
        }
      } catch (e_5_1) {
        e_5 = {
          error: e_5_1
        };
      } finally {
        try {
          if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
        } finally {
          if (e_5) throw e_5.error;
        }
      }

      this.stop();
    }
  };
  /*
   * Adds a listener that is notified whenever a state transition happens. The listener is called with
   * the next state and the event object that caused the state transition.
   *
   * @param listener The state listener
   */


  Interpreter.prototype.onTransition = function (listener) {
    this.listeners.add(listener); // Send current state to listener

    if (this._status === InterpreterStatus.Running) {
      listener(this.state, this.state.event);
    }

    return this;
  };

  Interpreter.prototype.subscribe = function (nextListenerOrObserver, _, // TODO: error listener
  completeListener) {
    var _this = this;

    if (!nextListenerOrObserver) {
      return {
        unsubscribe: function () {
          return void 0;
        }
      };
    }

    var listener;
    var resolvedCompleteListener = completeListener;

    if (typeof nextListenerOrObserver === 'function') {
      listener = nextListenerOrObserver;
    } else {
      listener = nextListenerOrObserver.next.bind(nextListenerOrObserver);
      resolvedCompleteListener = nextListenerOrObserver.complete.bind(nextListenerOrObserver);
    }

    this.listeners.add(listener); // Send current state to listener

    if (this._status === InterpreterStatus.Running) {
      listener(this.state);
    }

    if (resolvedCompleteListener) {
      this.onDone(resolvedCompleteListener);
    }

    return {
      unsubscribe: function () {
        listener && _this.listeners.delete(listener);
        resolvedCompleteListener && _this.doneListeners.delete(resolvedCompleteListener);
      }
    };
  };
  /**
   * Adds an event listener that is notified whenever an event is sent to the running interpreter.
   * @param listener The event listener
   */


  Interpreter.prototype.onEvent = function (listener) {
    this.eventListeners.add(listener);
    return this;
  };
  /**
   * Adds an event listener that is notified whenever a `send` event occurs.
   * @param listener The event listener
   */


  Interpreter.prototype.onSend = function (listener) {
    this.sendListeners.add(listener);
    return this;
  };
  /**
   * Adds a context listener that is notified whenever the state context changes.
   * @param listener The context listener
   */


  Interpreter.prototype.onChange = function (listener) {
    this.contextListeners.add(listener);
    return this;
  };
  /**
   * Adds a listener that is notified when the machine is stopped.
   * @param listener The listener
   */


  Interpreter.prototype.onStop = function (listener) {
    this.stopListeners.add(listener);
    return this;
  };
  /**
   * Adds a state listener that is notified when the statechart has reached its final state.
   * @param listener The state listener
   */


  Interpreter.prototype.onDone = function (listener) {
    this.doneListeners.add(listener);
    return this;
  };
  /**
   * Removes a listener.
   * @param listener The listener to remove
   */


  Interpreter.prototype.off = function (listener) {
    this.listeners.delete(listener);
    this.eventListeners.delete(listener);
    this.sendListeners.delete(listener);
    this.stopListeners.delete(listener);
    this.doneListeners.delete(listener);
    this.contextListeners.delete(listener);
    return this;
  };
  /**
   * Starts the interpreter from the given state, or the initial state.
   * @param initialState The state to start the statechart from
   */


  Interpreter.prototype.start = function (initialState) {
    var _this = this;

    if (this._status === InterpreterStatus.Running) {
      // Do not restart the service if it is already started
      return this;
    }

    _registry_js__WEBPACK_IMPORTED_MODULE_11__["registry"].register(this.sessionId, this);
    this.initialized = true;
    this._status = InterpreterStatus.Running;
    var resolvedState = initialState === undefined ? this.initialState : Object(_serviceScope_js__WEBPACK_IMPORTED_MODULE_8__["provide"])(this, function () {
      return Object(_State_js__WEBPACK_IMPORTED_MODULE_7__["isState"])(initialState) ? _this.machine.resolveState(initialState) : _this.machine.resolveState(_State_js__WEBPACK_IMPORTED_MODULE_7__["State"].from(initialState, _this.machine.context));
    });

    if (this.options.devTools) {
      this.attachDev();
    }

    this.scheduler.initialize(function () {
      _this.update(resolvedState, _actions_js__WEBPACK_IMPORTED_MODULE_6__["initEvent"]);
    });
    return this;
  };
  /**
   * Stops the interpreter and unsubscribe all listeners.
   *
   * This will also notify the `onStop` listeners.
   */


  Interpreter.prototype.stop = function () {
    var e_6, _a, e_7, _b, e_8, _c, e_9, _d, e_10, _e;

    try {
      for (var _f = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.listeners), _g = _f.next(); !_g.done; _g = _f.next()) {
        var listener = _g.value;
        this.listeners.delete(listener);
      }
    } catch (e_6_1) {
      e_6 = {
        error: e_6_1
      };
    } finally {
      try {
        if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
      } finally {
        if (e_6) throw e_6.error;
      }
    }

    try {
      for (var _h = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.stopListeners), _j = _h.next(); !_j.done; _j = _h.next()) {
        var listener = _j.value; // call listener, then remove

        listener();
        this.stopListeners.delete(listener);
      }
    } catch (e_7_1) {
      e_7 = {
        error: e_7_1
      };
    } finally {
      try {
        if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
      } finally {
        if (e_7) throw e_7.error;
      }
    }

    try {
      for (var _k = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.contextListeners), _l = _k.next(); !_l.done; _l = _k.next()) {
        var listener = _l.value;
        this.contextListeners.delete(listener);
      }
    } catch (e_8_1) {
      e_8 = {
        error: e_8_1
      };
    } finally {
      try {
        if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
      } finally {
        if (e_8) throw e_8.error;
      }
    }

    try {
      for (var _m = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.doneListeners), _o = _m.next(); !_o.done; _o = _m.next()) {
        var listener = _o.value;
        this.doneListeners.delete(listener);
      }
    } catch (e_9_1) {
      e_9 = {
        error: e_9_1
      };
    } finally {
      try {
        if (_o && !_o.done && (_d = _m.return)) _d.call(_m);
      } finally {
        if (e_9) throw e_9.error;
      }
    } // Stop all children


    this.children.forEach(function (child) {
      if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(child.stop)) {
        child.stop();
      }
    });

    try {
      // Cancel all delayed events
      for (var _p = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["keys"])(this.delayedEventsMap)), _q = _p.next(); !_q.done; _q = _p.next()) {
        var key = _q.value;
        this.clock.clearTimeout(this.delayedEventsMap[key]);
      }
    } catch (e_10_1) {
      e_10 = {
        error: e_10_1
      };
    } finally {
      try {
        if (_q && !_q.done && (_e = _p.return)) _e.call(_p);
      } finally {
        if (e_10) throw e_10.error;
      }
    }

    this.scheduler.clear();
    this.initialized = false;
    this._status = InterpreterStatus.Stopped;
    _registry_js__WEBPACK_IMPORTED_MODULE_11__["registry"].free(this.sessionId);
    return this;
  };

  Interpreter.prototype.batch = function (events) {
    var _this = this;

    if (this._status === InterpreterStatus.NotStarted && this.options.deferEvents) {
      // tslint:disable-next-line:no-console
      if (!_environment_js__WEBPACK_IMPORTED_MODULE_1__["IS_PRODUCTION"]) {
        Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["warn"])(false, events.length + " event(s) were sent to uninitialized service \"" + this.machine.id + "\" and are deferred. Make sure .start() is called for this service.\nEvent: " + JSON.stringify(event));
      }
    } else if (this._status !== InterpreterStatus.Running) {
      throw new Error( // tslint:disable-next-line:max-line-length
      events.length + " event(s) were sent to uninitialized service \"" + this.machine.id + "\". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.");
    }

    this.scheduler.schedule(function () {
      var e_11, _a;

      var nextState = _this.state;
      var batchChanged = false;
      var batchedActions = [];

      var _loop_1 = function (event_1) {
        var _event = Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["toSCXMLEvent"])(event_1);

        _this.forward(_event);

        nextState = Object(_serviceScope_js__WEBPACK_IMPORTED_MODULE_8__["provide"])(_this, function () {
          return _this.machine.transition(nextState, _event);
        });
        batchedActions.push.apply(batchedActions, Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__spread"])(nextState.actions.map(function (a) {
          return Object(_State_js__WEBPACK_IMPORTED_MODULE_7__["bindActionToState"])(a, nextState);
        })));
        batchChanged = batchChanged || !!nextState.changed;
      };

      try {
        for (var events_1 = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(events), events_1_1 = events_1.next(); !events_1_1.done; events_1_1 = events_1.next()) {
          var event_1 = events_1_1.value;

          _loop_1(event_1);
        }
      } catch (e_11_1) {
        e_11 = {
          error: e_11_1
        };
      } finally {
        try {
          if (events_1_1 && !events_1_1.done && (_a = events_1.return)) _a.call(events_1);
        } finally {
          if (e_11) throw e_11.error;
        }
      }

      nextState.changed = batchChanged;
      nextState.actions = batchedActions;

      _this.update(nextState, Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["toSCXMLEvent"])(events[events.length - 1]));
    });
  };
  /**
   * Returns a send function bound to this interpreter instance.
   *
   * @param event The event to be sent by the sender.
   */


  Interpreter.prototype.sender = function (event) {
    return this.send.bind(this, event);
  };
  /**
   * Returns the next state given the interpreter's current state and the event.
   *
   * This is a pure method that does _not_ update the interpreter's state.
   *
   * @param event The event to determine the next state
   */


  Interpreter.prototype.nextState = function (event) {
    var _this = this;

    var _event = Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["toSCXMLEvent"])(event);

    if (_event.name.indexOf(_actionTypes_js__WEBPACK_IMPORTED_MODULE_5__["errorPlatform"]) === 0 && !this.state.nextEvents.some(function (nextEvent) {
      return nextEvent.indexOf(_actionTypes_js__WEBPACK_IMPORTED_MODULE_5__["errorPlatform"]) === 0;
    })) {
      throw _event.data.data;
    }

    var nextState = Object(_serviceScope_js__WEBPACK_IMPORTED_MODULE_8__["provide"])(this, function () {
      return _this.machine.transition(_this.state, _event);
    });
    return nextState;
  };

  Interpreter.prototype.forward = function (event) {
    var e_12, _a;

    try {
      for (var _b = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.forwardTo), _c = _b.next(); !_c.done; _c = _b.next()) {
        var id = _c.value;
        var child = this.children.get(id);

        if (!child) {
          throw new Error("Unable to forward event '" + event + "' from interpreter '" + this.id + "' to nonexistant child '" + id + "'.");
        }

        child.send(event);
      }
    } catch (e_12_1) {
      e_12 = {
        error: e_12_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_12) throw e_12.error;
      }
    }
  };

  Interpreter.prototype.defer = function (sendAction) {
    var _this = this;

    this.delayedEventsMap[sendAction.id] = this.clock.setTimeout(function () {
      if (sendAction.to) {
        _this.sendTo(sendAction._event, sendAction.to);
      } else {
        _this.send(sendAction._event);
      }
    }, sendAction.delay);
  };

  Interpreter.prototype.cancel = function (sendId) {
    this.clock.clearTimeout(this.delayedEventsMap[sendId]);
    delete this.delayedEventsMap[sendId];
  };

  Interpreter.prototype.exec = function (action, state, actionFunctionMap) {
    if (actionFunctionMap === void 0) {
      actionFunctionMap = this.machine.options.actions;
    }

    var context = state.context,
        _event = state._event;
    var actionOrExec = action.exec || Object(_actions_js__WEBPACK_IMPORTED_MODULE_6__["getActionFunction"])(action.type, actionFunctionMap);
    var exec = Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(actionOrExec) ? actionOrExec : actionOrExec ? actionOrExec.exec : action.exec;

    if (exec) {
      try {
        return exec(context, _event.data, {
          action: action,
          state: this.state,
          _event: _event
        });
      } catch (err) {
        if (this.parent) {
          this.parent.send({
            type: 'xstate.error',
            data: err
          });
        }

        throw err;
      }
    }

    switch (action.type) {
      case _actionTypes_js__WEBPACK_IMPORTED_MODULE_5__["send"]:
        var sendAction = action;

        if (typeof sendAction.delay === 'number') {
          this.defer(sendAction);
          return;
        } else {
          if (sendAction.to) {
            this.sendTo(sendAction._event, sendAction.to);
          } else {
            this.send(sendAction._event);
          }
        }

        break;

      case _actionTypes_js__WEBPACK_IMPORTED_MODULE_5__["cancel"]:
        this.cancel(action.sendId);
        break;

      case _actionTypes_js__WEBPACK_IMPORTED_MODULE_5__["start"]:
        {
          var activity = action.activity; // If the activity will be stopped right after it's started
          // (such as in transient states)
          // don't bother starting the activity.

          if (!this.state.activities[activity.id || activity.type]) {
            break;
          } // Invoked services


          if (activity.type === _types_js__WEBPACK_IMPORTED_MODULE_3__["ActionTypes"].Invoke) {
            var invokeSource = Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["toInvokeSource"])(activity.src);
            var serviceCreator = this.machine.options.services ? this.machine.options.services[invokeSource.type] : undefined;
            var id = activity.id,
                data = activity.data;

            if (!_environment_js__WEBPACK_IMPORTED_MODULE_1__["IS_PRODUCTION"]) {
              Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["warn"])(!('forward' in activity), // tslint:disable-next-line:max-line-length
              "`forward` property is deprecated (found in invocation of '" + activity.src + "' in in machine '" + this.machine.id + "'). " + "Please use `autoForward` instead.");
            }

            var autoForward = 'autoForward' in activity ? activity.autoForward : !!activity.forward;

            if (!serviceCreator) {
              // tslint:disable-next-line:no-console
              if (!_environment_js__WEBPACK_IMPORTED_MODULE_1__["IS_PRODUCTION"]) {
                Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["warn"])(false, "No service found for invocation '" + activity.src + "' in machine '" + this.machine.id + "'.");
              }

              return;
            }

            var resolvedData = data ? Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["mapContext"])(data, context, _event) : undefined;
            var source = Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(serviceCreator) ? serviceCreator(context, _event.data, {
              data: resolvedData,
              src: invokeSource
            }) : serviceCreator;

            if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isPromiseLike"])(source)) {
              this.state.children[id] = this.spawnPromise(Promise.resolve(source), id);
            } else if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(source)) {
              this.state.children[id] = this.spawnCallback(source, id);
            } else if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isObservable"])(source)) {
              this.state.children[id] = this.spawnObservable(source, id);
            } else if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isMachine"])(source)) {
              // TODO: try/catch here
              this.state.children[id] = this.spawnMachine(resolvedData ? source.withContext(resolvedData) : source, {
                id: id,
                autoForward: autoForward
              });
            }
          } else {
            this.spawnActivity(activity);
          }

          break;
        }

      case _actionTypes_js__WEBPACK_IMPORTED_MODULE_5__["stop"]:
        {
          this.stopChild(action.activity.id);
          break;
        }

      case _actionTypes_js__WEBPACK_IMPORTED_MODULE_5__["log"]:
        var label = action.label,
            value = action.value;

        if (label) {
          this.logger(label, value);
        } else {
          this.logger(value);
        }

        break;

      default:
        if (!_environment_js__WEBPACK_IMPORTED_MODULE_1__["IS_PRODUCTION"]) {
          Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["warn"])(false, "No implementation found for action type '" + action.type + "'");
        }

        break;
    }

    return undefined;
  };

  Interpreter.prototype.removeChild = function (childId) {
    this.children.delete(childId);
    this.forwardTo.delete(childId);
    delete this.state.children[childId];
  };

  Interpreter.prototype.stopChild = function (childId) {
    var child = this.children.get(childId);

    if (!child) {
      return;
    }

    this.removeChild(childId);

    if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(child.stop)) {
      child.stop();
    }
  };

  Interpreter.prototype.spawn = function (entity, name, options) {
    if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isPromiseLike"])(entity)) {
      return this.spawnPromise(Promise.resolve(entity), name);
    } else if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(entity)) {
      return this.spawnCallback(entity, name);
    } else if (Object(_Actor_js__WEBPACK_IMPORTED_MODULE_9__["isActor"])(entity)) {
      return this.spawnActor(entity);
    } else if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isObservable"])(entity)) {
      return this.spawnObservable(entity, name);
    } else if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isMachine"])(entity)) {
      return this.spawnMachine(entity, Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), {
        id: name
      }));
    } else {
      throw new Error("Unable to spawn entity \"" + name + "\" of type \"" + typeof entity + "\".");
    }
  };

  Interpreter.prototype.spawnMachine = function (machine, options) {
    var _this = this;

    if (options === void 0) {
      options = {};
    }

    var childService = new Interpreter(machine, Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.options), {
      parent: this,
      id: options.id || machine.id
    }));

    var resolvedOptions = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, DEFAULT_SPAWN_OPTIONS), options);

    if (resolvedOptions.sync) {
      childService.onTransition(function (state) {
        _this.send(_actionTypes_js__WEBPACK_IMPORTED_MODULE_5__["update"], {
          state: state,
          id: childService.id
        });
      });
    }

    var actor = childService;
    this.children.set(childService.id, actor);

    if (resolvedOptions.autoForward) {
      this.forwardTo.add(childService.id);
    }

    childService.onDone(function (doneEvent) {
      _this.removeChild(childService.id);

      _this.send(Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["toSCXMLEvent"])(doneEvent, {
        origin: childService.id
      }));
    }).start();
    return actor;
  };

  Interpreter.prototype.spawnPromise = function (promise, id) {
    var _this = this;

    var canceled = false;
    promise.then(function (response) {
      if (!canceled) {
        _this.removeChild(id);

        _this.send(Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["toSCXMLEvent"])(Object(_actions_js__WEBPACK_IMPORTED_MODULE_6__["doneInvoke"])(id, response), {
          origin: id
        }));
      }
    }, function (errorData) {
      if (!canceled) {
        _this.removeChild(id);

        var errorEvent = Object(_actions_js__WEBPACK_IMPORTED_MODULE_6__["error"])(id, errorData);

        try {
          // Send "error.platform.id" to this (parent).
          _this.send(Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["toSCXMLEvent"])(errorEvent, {
            origin: id
          }));
        } catch (error) {
          Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["reportUnhandledExceptionOnInvocation"])(errorData, error, id);

          if (_this.devTools) {
            _this.devTools.send(errorEvent, _this.state);
          }

          if (_this.machine.strict) {
            // it would be better to always stop the state machine if unhandled
            // exception/promise rejection happens but because we don't want to
            // break existing code so enforce it on strict mode only especially so
            // because documentation says that onError is optional
            _this.stop();
          }
        }
      }
    });
    var actor = {
      id: id,
      send: function () {
        return void 0;
      },
      subscribe: function (next, handleError, complete) {
        var unsubscribed = false;
        promise.then(function (response) {
          if (unsubscribed) {
            return;
          }

          next && next(response);

          if (unsubscribed) {
            return;
          }

          complete && complete();
        }, function (err) {
          if (unsubscribed) {
            return;
          }

          handleError(err);
        });
        return {
          unsubscribe: function () {
            return unsubscribed = true;
          }
        };
      },
      stop: function () {
        canceled = true;
      },
      toJSON: function () {
        return {
          id: id
        };
      }
    };
    this.children.set(id, actor);
    return actor;
  };

  Interpreter.prototype.spawnCallback = function (callback, id) {
    var _this = this;

    var canceled = false;
    var receivers = new Set();
    var listeners = new Set();

    var receive = function (e) {
      listeners.forEach(function (listener) {
        return listener(e);
      });

      if (canceled) {
        return;
      }

      _this.send(e);
    };

    var callbackStop;

    try {
      callbackStop = callback(receive, function (newListener) {
        receivers.add(newListener);
      });
    } catch (err) {
      this.send(Object(_actions_js__WEBPACK_IMPORTED_MODULE_6__["error"])(id, err));
    }

    if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isPromiseLike"])(callbackStop)) {
      // it turned out to be an async function, can't reliably check this before calling `callback`
      // because transpiled async functions are not recognizable
      return this.spawnPromise(callbackStop, id);
    }

    var actor = {
      id: id,
      send: function (event) {
        return receivers.forEach(function (receiver) {
          return receiver(event);
        });
      },
      subscribe: function (next) {
        listeners.add(next);
        return {
          unsubscribe: function () {
            listeners.delete(next);
          }
        };
      },
      stop: function () {
        canceled = true;

        if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(callbackStop)) {
          callbackStop();
        }
      },
      toJSON: function () {
        return {
          id: id
        };
      }
    };
    this.children.set(id, actor);
    return actor;
  };

  Interpreter.prototype.spawnObservable = function (source, id) {
    var _this = this;

    var subscription = source.subscribe(function (value) {
      _this.send(Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["toSCXMLEvent"])(value, {
        origin: id
      }));
    }, function (err) {
      _this.removeChild(id);

      _this.send(Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["toSCXMLEvent"])(Object(_actions_js__WEBPACK_IMPORTED_MODULE_6__["error"])(id, err), {
        origin: id
      }));
    }, function () {
      _this.removeChild(id);

      _this.send(Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["toSCXMLEvent"])(Object(_actions_js__WEBPACK_IMPORTED_MODULE_6__["doneInvoke"])(id), {
        origin: id
      }));
    });
    var actor = {
      id: id,
      send: function () {
        return void 0;
      },
      subscribe: function (next, handleError, complete) {
        return source.subscribe(next, handleError, complete);
      },
      stop: function () {
        return subscription.unsubscribe();
      },
      toJSON: function () {
        return {
          id: id
        };
      }
    };
    this.children.set(id, actor);
    return actor;
  };

  Interpreter.prototype.spawnActor = function (actor) {
    this.children.set(actor.id, actor);
    return actor;
  };

  Interpreter.prototype.spawnActivity = function (activity) {
    var implementation = this.machine.options && this.machine.options.activities ? this.machine.options.activities[activity.type] : undefined;

    if (!implementation) {
      if (!_environment_js__WEBPACK_IMPORTED_MODULE_1__["IS_PRODUCTION"]) {
        Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["warn"])(false, "No implementation found for activity '" + activity.type + "'");
      } // tslint:disable-next-line:no-console


      return;
    } // Start implementation


    var dispose = implementation(this.state.context, activity);
    this.spawnEffect(activity.id, dispose);
  };

  Interpreter.prototype.spawnEffect = function (id, dispose) {
    this.children.set(id, {
      id: id,
      send: function () {
        return void 0;
      },
      subscribe: function () {
        return {
          unsubscribe: function () {
            return void 0;
          }
        };
      },
      stop: dispose || undefined,
      toJSON: function () {
        return {
          id: id
        };
      }
    });
  };

  Interpreter.prototype.attachDev = function () {
    if (this.options.devTools && typeof window !== 'undefined') {
      if (window.__REDUX_DEVTOOLS_EXTENSION__) {
        var devToolsOptions = typeof this.options.devTools === 'object' ? this.options.devTools : undefined;
        this.devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({
          name: this.id,
          autoPause: true,
          stateSanitizer: function (state) {
            return {
              value: state.value,
              context: state.context,
              actions: state.actions
            };
          }
        }, devToolsOptions), {
          features: Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({
            jump: false,
            skip: false
          }, devToolsOptions ? devToolsOptions.features : undefined)
        }), this.machine);
        this.devTools.init(this.state);
      } // add XState-specific dev tooling hook


      Object(_devTools_js__WEBPACK_IMPORTED_MODULE_12__["registerService"])(this);
    }
  };

  Interpreter.prototype.toJSON = function () {
    return {
      id: this.id
    };
  };

  Interpreter.prototype[_utils_js__WEBPACK_IMPORTED_MODULE_2__["symbolObservable"]] = function () {
    return this;
  };
  /**
   * The default interpreter options:
   *
   * - `clock` uses the global `setTimeout` and `clearTimeout` functions
   * - `logger` uses the global `console.log()` method
   */


  Interpreter.defaultOptions = /*#__PURE__*/function (global) {
    return {
      execute: true,
      deferEvents: true,
      clock: {
        setTimeout: function (fn, ms) {
          return global.setTimeout.call(null, fn, ms);
        },
        clearTimeout: function (id) {
          return global.clearTimeout.call(null, id);
        }
      },
      logger: global.console.log.bind(console),
      devTools: false
    };
  }(typeof self !== 'undefined' ? self : global);

  Interpreter.interpret = interpret;
  return Interpreter;
}();

var resolveSpawnOptions = function (nameOrOptions) {
  if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isString"])(nameOrOptions)) {
    return Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, DEFAULT_SPAWN_OPTIONS), {
      name: nameOrOptions
    });
  }

  return Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, DEFAULT_SPAWN_OPTIONS), {
    name: Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["uniqueId"])()
  }), nameOrOptions);
};

function spawn(entity, nameOrOptions) {
  var resolvedOptions = resolveSpawnOptions(nameOrOptions);
  return Object(_serviceScope_js__WEBPACK_IMPORTED_MODULE_8__["consume"])(function (service) {
    if (!_environment_js__WEBPACK_IMPORTED_MODULE_1__["IS_PRODUCTION"]) {
      var isLazyEntity = Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isMachine"])(entity) || Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(entity);
      Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["warn"])(!!service || isLazyEntity, "Attempted to spawn an Actor (ID: \"" + (Object(_utils_js__WEBPACK_IMPORTED_MODULE_2__["isMachine"])(entity) ? entity.id : 'undefined') + "\") outside of a service. This will have no effect.");
    }

    if (service) {
      return service.spawn(entity, resolvedOptions.name, resolvedOptions);
    } else {
      return Object(_Actor_js__WEBPACK_IMPORTED_MODULE_9__["createDeferredActor"])(entity, resolvedOptions.name);
    }
  });
}
/**
 * Creates a new Interpreter instance for the given machine with the provided options, if any.
 *
 * @param machine The machine to interpret
 * @param options Interpreter options
 */


function interpret(machine, options) {
  var interpreter = new Interpreter(machine, options);
  return interpreter;
}


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/xstate/es/invokeUtils.js":
/*!***********************************************!*\
  !*** ./node_modules/xstate/es/invokeUtils.js ***!
  \***********************************************/
/*! exports provided: toInvokeDefinition, toInvokeSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toInvokeDefinition", function() { return toInvokeDefinition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toInvokeSource", function() { return toInvokeSource; });
/* harmony import */ var _virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_virtual/_tslib.js */ "./node_modules/xstate/es/_virtual/_tslib.js");
/* harmony import */ var _actionTypes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actionTypes.js */ "./node_modules/xstate/es/actionTypes.js");
/* harmony import */ var _actions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions.js */ "./node_modules/xstate/es/actions.js");




function toInvokeSource(src) {
  if (typeof src === 'string') {
    var simpleSrc = {
      type: src
    };

    simpleSrc.toString = function () {
      return src;
    }; // v4 compat - TODO: remove in v5


    return simpleSrc;
  }

  return src;
}

function toInvokeDefinition(invokeConfig) {
  return Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({
    type: _actionTypes_js__WEBPACK_IMPORTED_MODULE_1__["invoke"]
  }, invokeConfig), {
    toJSON: function () {
      var onDone = invokeConfig.onDone,
          onError = invokeConfig.onError,
          invokeDef = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__rest"])(invokeConfig, ["onDone", "onError"]);

      return Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, invokeDef), {
        type: _actionTypes_js__WEBPACK_IMPORTED_MODULE_1__["invoke"],
        src: toInvokeSource(invokeConfig.src)
      });
    }
  });
}



/***/ }),

/***/ "./node_modules/xstate/es/mapState.js":
/*!********************************************!*\
  !*** ./node_modules/xstate/es/mapState.js ***!
  \********************************************/
/*! exports provided: mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony import */ var _virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_virtual/_tslib.js */ "./node_modules/xstate/es/_virtual/_tslib.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/xstate/es/utils.js");



function mapState(stateMap, stateId) {
  var e_1, _a;

  var foundStateId;

  try {
    for (var _b = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["keys"])(stateMap)), _c = _b.next(); !_c.done; _c = _b.next()) {
      var mappedStateId = _c.value;

      if (Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["matchesState"])(mappedStateId, stateId) && (!foundStateId || stateId.length > foundStateId.length)) {
        foundStateId = mappedStateId;
      }
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
    } finally {
      if (e_1) throw e_1.error;
    }
  }

  return stateMap[foundStateId];
}



/***/ }),

/***/ "./node_modules/xstate/es/match.js":
/*!*****************************************!*\
  !*** ./node_modules/xstate/es/match.js ***!
  \*****************************************/
/*! exports provided: matchState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matchState", function() { return matchState; });
/* harmony import */ var _virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_virtual/_tslib.js */ "./node_modules/xstate/es/_virtual/_tslib.js");
/* harmony import */ var _State_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./State.js */ "./node_modules/xstate/es/State.js");



function matchState(state, patterns, defaultValue) {
  var e_1, _a;

  var resolvedState = _State_js__WEBPACK_IMPORTED_MODULE_1__["State"].from(state, state instanceof _State_js__WEBPACK_IMPORTED_MODULE_1__["State"] ? state.context : undefined);

  try {
    for (var patterns_1 = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(patterns), patterns_1_1 = patterns_1.next(); !patterns_1_1.done; patterns_1_1 = patterns_1.next()) {
      var _b = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__read"])(patterns_1_1.value, 2),
          stateValue = _b[0],
          getValue = _b[1];

      if (resolvedState.matches(stateValue)) {
        return getValue(resolvedState);
      }
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (patterns_1_1 && !patterns_1_1.done && (_a = patterns_1.return)) _a.call(patterns_1);
    } finally {
      if (e_1) throw e_1.error;
    }
  }

  return defaultValue(resolvedState);
}



/***/ }),

/***/ "./node_modules/xstate/es/registry.js":
/*!********************************************!*\
  !*** ./node_modules/xstate/es/registry.js ***!
  \********************************************/
/*! exports provided: registry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registry", function() { return registry; });
var children = /*#__PURE__*/new Map();
var sessionIdIndex = 0;
var registry = {
  bookId: function () {
    return "x:" + sessionIdIndex++;
  },
  register: function (id, actor) {
    children.set(id, actor);
    return id;
  },
  get: function (id) {
    return children.get(id);
  },
  free: function (id) {
    children.delete(id);
  }
};


/***/ }),

/***/ "./node_modules/xstate/es/scheduler.js":
/*!*********************************************!*\
  !*** ./node_modules/xstate/es/scheduler.js ***!
  \*********************************************/
/*! exports provided: Scheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scheduler", function() { return Scheduler; });
/* harmony import */ var _virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_virtual/_tslib.js */ "./node_modules/xstate/es/_virtual/_tslib.js");

var defaultOptions = {
  deferEvents: false
};

var Scheduler =
/*#__PURE__*/

/** @class */
function () {
  function Scheduler(options) {
    this.processingEvent = false;
    this.queue = [];
    this.initialized = false;
    this.options = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, defaultOptions), options);
  }

  Scheduler.prototype.initialize = function (callback) {
    this.initialized = true;

    if (callback) {
      if (!this.options.deferEvents) {
        this.schedule(callback);
        return;
      }

      this.process(callback);
    }

    this.flushEvents();
  };

  Scheduler.prototype.schedule = function (task) {
    if (!this.initialized || this.processingEvent) {
      this.queue.push(task);
      return;
    }

    if (this.queue.length !== 0) {
      throw new Error('Event queue should be empty when it is not processing events');
    }

    this.process(task);
    this.flushEvents();
  };

  Scheduler.prototype.clear = function () {
    this.queue = [];
  };

  Scheduler.prototype.flushEvents = function () {
    var nextCallback = this.queue.shift();

    while (nextCallback) {
      this.process(nextCallback);
      nextCallback = this.queue.shift();
    }
  };

  Scheduler.prototype.process = function (callback) {
    this.processingEvent = true;

    try {
      callback();
    } catch (e) {
      // there is no use to keep the future events
      // as the situation is not anymore the same
      this.clear();
      throw e;
    } finally {
      this.processingEvent = false;
    }
  };

  return Scheduler;
}();



/***/ }),

/***/ "./node_modules/xstate/es/serviceScope.js":
/*!************************************************!*\
  !*** ./node_modules/xstate/es/serviceScope.js ***!
  \************************************************/
/*! exports provided: consume, provide */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consume", function() { return consume; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "provide", function() { return provide; });
/**
 * Maintains a stack of the current service in scope.
 * This is used to provide the correct service to spawn().
 */
var serviceStack = [];

var provide = function (service, fn) {
  serviceStack.push(service);
  var result = fn(service);
  serviceStack.pop();
  return result;
};

var consume = function (fn) {
  return fn(serviceStack[serviceStack.length - 1]);
};



/***/ }),

/***/ "./node_modules/xstate/es/stateUtils.js":
/*!**********************************************!*\
  !*** ./node_modules/xstate/es/stateUtils.js ***!
  \**********************************************/
/*! exports provided: getAdjList, getAllStateNodes, getChildren, getConfiguration, getValue, has, isInFinalState, isLeafNode, nextEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAdjList", function() { return getAdjList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllStateNodes", function() { return getAllStateNodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getChildren", function() { return getChildren; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConfiguration", function() { return getConfiguration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getValue", function() { return getValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "has", function() { return has; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInFinalState", function() { return isInFinalState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLeafNode", function() { return isLeafNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nextEvents", function() { return nextEvents; });
/* harmony import */ var _virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_virtual/_tslib.js */ "./node_modules/xstate/es/_virtual/_tslib.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/xstate/es/utils.js");



var isLeafNode = function (stateNode) {
  return stateNode.type === 'atomic' || stateNode.type === 'final';
};

function getChildren(stateNode) {
  return Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["keys"])(stateNode.states).map(function (key) {
    return stateNode.states[key];
  });
}

function getAllStateNodes(stateNode) {
  var stateNodes = [stateNode];

  if (isLeafNode(stateNode)) {
    return stateNodes;
  }

  return stateNodes.concat(Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["flatten"])(getChildren(stateNode).map(getAllStateNodes)));
}

function getConfiguration(prevStateNodes, stateNodes) {
  var e_1, _a, e_2, _b, e_3, _c, e_4, _d;

  var prevConfiguration = new Set(prevStateNodes);
  var prevAdjList = getAdjList(prevConfiguration);
  var configuration = new Set(stateNodes);

  try {
    // add all ancestors
    for (var configuration_1 = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(configuration), configuration_1_1 = configuration_1.next(); !configuration_1_1.done; configuration_1_1 = configuration_1.next()) {
      var s = configuration_1_1.value;
      var m = s.parent;

      while (m && !configuration.has(m)) {
        configuration.add(m);
        m = m.parent;
      }
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (configuration_1_1 && !configuration_1_1.done && (_a = configuration_1.return)) _a.call(configuration_1);
    } finally {
      if (e_1) throw e_1.error;
    }
  }

  var adjList = getAdjList(configuration);

  try {
    // add descendants
    for (var configuration_2 = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(configuration), configuration_2_1 = configuration_2.next(); !configuration_2_1.done; configuration_2_1 = configuration_2.next()) {
      var s = configuration_2_1.value; // if previously active, add existing child nodes

      if (s.type === 'compound' && (!adjList.get(s) || !adjList.get(s).length)) {
        if (prevAdjList.get(s)) {
          prevAdjList.get(s).forEach(function (sn) {
            return configuration.add(sn);
          });
        } else {
          s.initialStateNodes.forEach(function (sn) {
            return configuration.add(sn);
          });
        }
      } else {
        if (s.type === 'parallel') {
          try {
            for (var _e = (e_3 = void 0, Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(getChildren(s))), _f = _e.next(); !_f.done; _f = _e.next()) {
              var child = _f.value;

              if (child.type === 'history') {
                continue;
              }

              if (!configuration.has(child)) {
                configuration.add(child);

                if (prevAdjList.get(child)) {
                  prevAdjList.get(child).forEach(function (sn) {
                    return configuration.add(sn);
                  });
                } else {
                  child.initialStateNodes.forEach(function (sn) {
                    return configuration.add(sn);
                  });
                }
              }
            }
          } catch (e_3_1) {
            e_3 = {
              error: e_3_1
            };
          } finally {
            try {
              if (_f && !_f.done && (_c = _e.return)) _c.call(_e);
            } finally {
              if (e_3) throw e_3.error;
            }
          }
        }
      }
    }
  } catch (e_2_1) {
    e_2 = {
      error: e_2_1
    };
  } finally {
    try {
      if (configuration_2_1 && !configuration_2_1.done && (_b = configuration_2.return)) _b.call(configuration_2);
    } finally {
      if (e_2) throw e_2.error;
    }
  }

  try {
    // add all ancestors
    for (var configuration_3 = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(configuration), configuration_3_1 = configuration_3.next(); !configuration_3_1.done; configuration_3_1 = configuration_3.next()) {
      var s = configuration_3_1.value;
      var m = s.parent;

      while (m && !configuration.has(m)) {
        configuration.add(m);
        m = m.parent;
      }
    }
  } catch (e_4_1) {
    e_4 = {
      error: e_4_1
    };
  } finally {
    try {
      if (configuration_3_1 && !configuration_3_1.done && (_d = configuration_3.return)) _d.call(configuration_3);
    } finally {
      if (e_4) throw e_4.error;
    }
  }

  return configuration;
}

function getValueFromAdj(baseNode, adjList) {
  var childStateNodes = adjList.get(baseNode);

  if (!childStateNodes) {
    return {}; // todo: fix?
  }

  if (baseNode.type === 'compound') {
    var childStateNode = childStateNodes[0];

    if (childStateNode) {
      if (isLeafNode(childStateNode)) {
        return childStateNode.key;
      }
    } else {
      return {};
    }
  }

  var stateValue = {};
  childStateNodes.forEach(function (csn) {
    stateValue[csn.key] = getValueFromAdj(csn, adjList);
  });
  return stateValue;
}

function getAdjList(configuration) {
  var e_5, _a;

  var adjList = new Map();

  try {
    for (var configuration_4 = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(configuration), configuration_4_1 = configuration_4.next(); !configuration_4_1.done; configuration_4_1 = configuration_4.next()) {
      var s = configuration_4_1.value;

      if (!adjList.has(s)) {
        adjList.set(s, []);
      }

      if (s.parent) {
        if (!adjList.has(s.parent)) {
          adjList.set(s.parent, []);
        }

        adjList.get(s.parent).push(s);
      }
    }
  } catch (e_5_1) {
    e_5 = {
      error: e_5_1
    };
  } finally {
    try {
      if (configuration_4_1 && !configuration_4_1.done && (_a = configuration_4.return)) _a.call(configuration_4);
    } finally {
      if (e_5) throw e_5.error;
    }
  }

  return adjList;
}

function getValue(rootNode, configuration) {
  var config = getConfiguration([rootNode], configuration);
  return getValueFromAdj(rootNode, getAdjList(config));
}

function has(iterable, item) {
  if (Array.isArray(iterable)) {
    return iterable.some(function (member) {
      return member === item;
    });
  }

  if (iterable instanceof Set) {
    return iterable.has(item);
  }

  return false; // TODO: fix
}

function nextEvents(configuration) {
  return Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["flatten"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__spread"])(new Set(configuration.map(function (sn) {
    return sn.ownEvents;
  }))));
}

function isInFinalState(configuration, stateNode) {
  if (stateNode.type === 'compound') {
    return getChildren(stateNode).some(function (s) {
      return s.type === 'final' && has(configuration, s);
    });
  }

  if (stateNode.type === 'parallel') {
    return getChildren(stateNode).every(function (sn) {
      return isInFinalState(configuration, sn);
    });
  }

  return false;
}



/***/ }),

/***/ "./node_modules/xstate/es/types.js":
/*!*****************************************!*\
  !*** ./node_modules/xstate/es/types.js ***!
  \*****************************************/
/*! exports provided: ActionTypes, SpecialTargets */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionTypes", function() { return ActionTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpecialTargets", function() { return SpecialTargets; });
var ActionTypes;

(function (ActionTypes) {
  ActionTypes["Start"] = "xstate.start";
  ActionTypes["Stop"] = "xstate.stop";
  ActionTypes["Raise"] = "xstate.raise";
  ActionTypes["Send"] = "xstate.send";
  ActionTypes["Cancel"] = "xstate.cancel";
  ActionTypes["NullEvent"] = "";
  ActionTypes["Assign"] = "xstate.assign";
  ActionTypes["After"] = "xstate.after";
  ActionTypes["DoneState"] = "done.state";
  ActionTypes["DoneInvoke"] = "done.invoke";
  ActionTypes["Log"] = "xstate.log";
  ActionTypes["Init"] = "xstate.init";
  ActionTypes["Invoke"] = "xstate.invoke";
  ActionTypes["ErrorExecution"] = "error.execution";
  ActionTypes["ErrorCommunication"] = "error.communication";
  ActionTypes["ErrorPlatform"] = "error.platform";
  ActionTypes["ErrorCustom"] = "xstate.error";
  ActionTypes["Update"] = "xstate.update";
  ActionTypes["Pure"] = "xstate.pure";
  ActionTypes["Choose"] = "xstate.choose";
})(ActionTypes || (ActionTypes = {}));

var SpecialTargets;

(function (SpecialTargets) {
  SpecialTargets["Parent"] = "#_parent";
  SpecialTargets["Internal"] = "#_internal";
})(SpecialTargets || (SpecialTargets = {}));



/***/ }),

/***/ "./node_modules/xstate/es/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/xstate/es/utils.js ***!
  \*****************************************/
/*! exports provided: evaluateGuard, flatten, getEventType, isArray, isBuiltInEvent, isFunction, isMachine, isObservable, isPromiseLike, isStateLike, isString, keys, mapContext, mapFilterValues, mapValues, matchesState, nestedPath, normalizeTarget, partition, path, pathToStateValue, reportUnhandledExceptionOnInvocation, symbolObservable, toArray, toArrayStrict, toEventObject, toGuard, toInvokeSource, toSCXMLEvent, toStatePath, toStatePaths, toStateValue, toTransitionConfigArray, uniqueId, updateContext, updateHistoryStates, updateHistoryValue, warn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "evaluateGuard", function() { return evaluateGuard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flatten", function() { return flatten; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEventType", function() { return getEventType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBuiltInEvent", function() { return isBuiltInEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMachine", function() { return isMachine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservable", function() { return isObservable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPromiseLike", function() { return isPromiseLike; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isStateLike", function() { return isStateLike; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return keys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapContext", function() { return mapContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapFilterValues", function() { return mapFilterValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapValues", function() { return mapValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matchesState", function() { return matchesState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nestedPath", function() { return nestedPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeTarget", function() { return normalizeTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "partition", function() { return partition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "path", function() { return path; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pathToStateValue", function() { return pathToStateValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reportUnhandledExceptionOnInvocation", function() { return reportUnhandledExceptionOnInvocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "symbolObservable", function() { return symbolObservable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toArray", function() { return toArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toArrayStrict", function() { return toArrayStrict; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toEventObject", function() { return toEventObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toGuard", function() { return toGuard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toInvokeSource", function() { return toInvokeSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toSCXMLEvent", function() { return toSCXMLEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toStatePath", function() { return toStatePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toStatePaths", function() { return toStatePaths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toStateValue", function() { return toStateValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toTransitionConfigArray", function() { return toTransitionConfigArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uniqueId", function() { return uniqueId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateContext", function() { return updateContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateHistoryStates", function() { return updateHistoryStates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateHistoryValue", function() { return updateHistoryValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "warn", function() { return warn; });
/* harmony import */ var _virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_virtual/_tslib.js */ "./node_modules/xstate/es/_virtual/_tslib.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ "./node_modules/xstate/es/constants.js");
/* harmony import */ var _environment_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./environment.js */ "./node_modules/xstate/es/environment.js");




function keys(value) {
  return Object.keys(value);
}

function matchesState(parentStateId, childStateId, delimiter) {
  if (delimiter === void 0) {
    delimiter = _constants_js__WEBPACK_IMPORTED_MODULE_1__["STATE_DELIMITER"];
  }

  var parentStateValue = toStateValue(parentStateId, delimiter);
  var childStateValue = toStateValue(childStateId, delimiter);

  if (isString(childStateValue)) {
    if (isString(parentStateValue)) {
      return childStateValue === parentStateValue;
    } // Parent more specific than child


    return false;
  }

  if (isString(parentStateValue)) {
    return parentStateValue in childStateValue;
  }

  return keys(parentStateValue).every(function (key) {
    if (!(key in childStateValue)) {
      return false;
    }

    return matchesState(parentStateValue[key], childStateValue[key]);
  });
}

function getEventType(event) {
  try {
    return isString(event) || typeof event === 'number' ? "" + event : event.type;
  } catch (e) {
    throw new Error('Events must be strings or objects with a string event.type property.');
  }
}

function toStatePath(stateId, delimiter) {
  try {
    if (isArray(stateId)) {
      return stateId;
    }

    return stateId.toString().split(delimiter);
  } catch (e) {
    throw new Error("'" + stateId + "' is not a valid state path.");
  }
}

function isStateLike(state) {
  return typeof state === 'object' && 'value' in state && 'context' in state && 'event' in state && '_event' in state;
}

function toStateValue(stateValue, delimiter) {
  if (isStateLike(stateValue)) {
    return stateValue.value;
  }

  if (isArray(stateValue)) {
    return pathToStateValue(stateValue);
  }

  if (typeof stateValue !== 'string') {
    return stateValue;
  }

  var statePath = toStatePath(stateValue, delimiter);
  return pathToStateValue(statePath);
}

function pathToStateValue(statePath) {
  if (statePath.length === 1) {
    return statePath[0];
  }

  var value = {};
  var marker = value;

  for (var i = 0; i < statePath.length - 1; i++) {
    if (i === statePath.length - 2) {
      marker[statePath[i]] = statePath[i + 1];
    } else {
      marker[statePath[i]] = {};
      marker = marker[statePath[i]];
    }
  }

  return value;
}

function mapValues(collection, iteratee) {
  var result = {};
  var collectionKeys = keys(collection);

  for (var i = 0; i < collectionKeys.length; i++) {
    var key = collectionKeys[i];
    result[key] = iteratee(collection[key], key, collection, i);
  }

  return result;
}

function mapFilterValues(collection, iteratee, predicate) {
  var e_1, _a;

  var result = {};

  try {
    for (var _b = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(keys(collection)), _c = _b.next(); !_c.done; _c = _b.next()) {
      var key = _c.value;
      var item = collection[key];

      if (!predicate(item)) {
        continue;
      }

      result[key] = iteratee(item, key, collection);
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
    } finally {
      if (e_1) throw e_1.error;
    }
  }

  return result;
}
/**
 * Retrieves a value at the given path.
 * @param props The deep path to the prop of the desired value
 */


var path = function (props) {
  return function (object) {
    var e_2, _a;

    var result = object;

    try {
      for (var props_1 = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
        var prop = props_1_1.value;
        result = result[prop];
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (props_1_1 && !props_1_1.done && (_a = props_1.return)) _a.call(props_1);
      } finally {
        if (e_2) throw e_2.error;
      }
    }

    return result;
  };
};
/**
 * Retrieves a value at the given path via the nested accessor prop.
 * @param props The deep path to the prop of the desired value
 */


function nestedPath(props, accessorProp) {
  return function (object) {
    var e_3, _a;

    var result = object;

    try {
      for (var props_2 = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(props), props_2_1 = props_2.next(); !props_2_1.done; props_2_1 = props_2.next()) {
        var prop = props_2_1.value;
        result = result[accessorProp][prop];
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1
      };
    } finally {
      try {
        if (props_2_1 && !props_2_1.done && (_a = props_2.return)) _a.call(props_2);
      } finally {
        if (e_3) throw e_3.error;
      }
    }

    return result;
  };
}

function toStatePaths(stateValue) {
  if (!stateValue) {
    return [[]];
  }

  if (isString(stateValue)) {
    return [[stateValue]];
  }

  var result = flatten(keys(stateValue).map(function (key) {
    var subStateValue = stateValue[key];

    if (typeof subStateValue !== 'string' && (!subStateValue || !Object.keys(subStateValue).length)) {
      return [[key]];
    }

    return toStatePaths(stateValue[key]).map(function (subPath) {
      return [key].concat(subPath);
    });
  }));
  return result;
}

function flatten(array) {
  var _a;

  return (_a = []).concat.apply(_a, Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__spread"])(array));
}

function toArrayStrict(value) {
  if (isArray(value)) {
    return value;
  }

  return [value];
}

function toArray(value) {
  if (value === undefined) {
    return [];
  }

  return toArrayStrict(value);
}

function mapContext(mapper, context, _event) {
  var e_5, _a;

  if (isFunction(mapper)) {
    return mapper(context, _event.data);
  }

  var result = {};

  try {
    for (var _b = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(Object.keys(mapper)), _c = _b.next(); !_c.done; _c = _b.next()) {
      var key = _c.value;
      var subMapper = mapper[key];

      if (isFunction(subMapper)) {
        result[key] = subMapper(context, _event.data);
      } else {
        result[key] = subMapper;
      }
    }
  } catch (e_5_1) {
    e_5 = {
      error: e_5_1
    };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
    } finally {
      if (e_5) throw e_5.error;
    }
  }

  return result;
}

function isBuiltInEvent(eventType) {
  return /^(done|error)\./.test(eventType);
}

function isPromiseLike(value) {
  if (value instanceof Promise) {
    return true;
  } // Check if shape matches the Promise/A+ specification for a "thenable".


  if (value !== null && (isFunction(value) || typeof value === 'object') && isFunction(value.then)) {
    return true;
  }

  return false;
}

function partition(items, predicate) {
  var e_6, _a;

  var _b = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__read"])([[], []], 2),
      truthy = _b[0],
      falsy = _b[1];

  try {
    for (var items_1 = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
      var item = items_1_1.value;

      if (predicate(item)) {
        truthy.push(item);
      } else {
        falsy.push(item);
      }
    }
  } catch (e_6_1) {
    e_6 = {
      error: e_6_1
    };
  } finally {
    try {
      if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
    } finally {
      if (e_6) throw e_6.error;
    }
  }

  return [truthy, falsy];
}

function updateHistoryStates(hist, stateValue) {
  return mapValues(hist.states, function (subHist, key) {
    if (!subHist) {
      return undefined;
    }

    var subStateValue = (isString(stateValue) ? undefined : stateValue[key]) || (subHist ? subHist.current : undefined);

    if (!subStateValue) {
      return undefined;
    }

    return {
      current: subStateValue,
      states: updateHistoryStates(subHist, subStateValue)
    };
  });
}

function updateHistoryValue(hist, stateValue) {
  return {
    current: stateValue,
    states: updateHistoryStates(hist, stateValue)
  };
}

function updateContext(context, _event, assignActions, state) {
  if (!_environment_js__WEBPACK_IMPORTED_MODULE_2__["IS_PRODUCTION"]) {
    warn(!!context, 'Attempting to update undefined context');
  }

  var updatedContext = context ? assignActions.reduce(function (acc, assignAction) {
    var e_7, _a;

    var assignment = assignAction.assignment;
    var meta = {
      state: state,
      action: assignAction,
      _event: _event
    };
    var partialUpdate = {};

    if (isFunction(assignment)) {
      partialUpdate = assignment(acc, _event.data, meta);
    } else {
      try {
        for (var _b = Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__values"])(keys(assignment)), _c = _b.next(); !_c.done; _c = _b.next()) {
          var key = _c.value;
          var propAssignment = assignment[key];
          partialUpdate[key] = isFunction(propAssignment) ? propAssignment(acc, _event.data, meta) : propAssignment;
        }
      } catch (e_7_1) {
        e_7 = {
          error: e_7_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        } finally {
          if (e_7) throw e_7.error;
        }
      }
    }

    return Object.assign({}, acc, partialUpdate);
  }, context) : context;
  return updatedContext;
} // tslint:disable-next-line:no-empty


var warn = function () {};

if (!_environment_js__WEBPACK_IMPORTED_MODULE_2__["IS_PRODUCTION"]) {
  warn = function (condition, message) {
    var error = condition instanceof Error ? condition : undefined;

    if (!error && condition) {
      return;
    }

    if (console !== undefined) {
      var args = ["Warning: " + message];

      if (error) {
        args.push(error);
      } // tslint:disable-next-line:no-console


      console.warn.apply(console, args);
    }
  };
}

function isArray(value) {
  return Array.isArray(value);
} // tslint:disable-next-line:ban-types


function isFunction(value) {
  return typeof value === 'function';
}

function isString(value) {
  return typeof value === 'string';
} // export function memoizedGetter<T, TP extends { prototype: object }>(
//   o: TP,
//   property: string,
//   getter: () => T
// ): void {
//   Object.defineProperty(o.prototype, property, {
//     get: getter,
//     enumerable: false,
//     configurable: false
//   });
// }


function toGuard(condition, guardMap) {
  if (!condition) {
    return undefined;
  }

  if (isString(condition)) {
    return {
      type: _constants_js__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_GUARD_TYPE"],
      name: condition,
      predicate: guardMap ? guardMap[condition] : undefined
    };
  }

  if (isFunction(condition)) {
    return {
      type: _constants_js__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_GUARD_TYPE"],
      name: condition.name,
      predicate: condition
    };
  }

  return condition;
}

function isObservable(value) {
  try {
    return 'subscribe' in value && isFunction(value.subscribe);
  } catch (e) {
    return false;
  }
}

var symbolObservable = /*#__PURE__*/function () {
  return typeof Symbol === 'function' && Symbol.observable || '@@observable';
}();

function isMachine(value) {
  try {
    return '__xstatenode' in value;
  } catch (e) {
    return false;
  }
}

var uniqueId = /*#__PURE__*/function () {
  var currentId = 0;
  return function () {
    currentId++;
    return currentId.toString(16);
  };
}();

function toEventObject(event, payload // id?: TEvent['type']
) {
  if (isString(event) || typeof event === 'number') {
    return Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({
      type: event
    }, payload);
  }

  return event;
}

function toSCXMLEvent(event, scxmlEvent) {
  if (!isString(event) && '$$type' in event && event.$$type === 'scxml') {
    return event;
  }

  var eventObject = toEventObject(event);
  return Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({
    name: eventObject.type,
    data: eventObject,
    $$type: 'scxml',
    type: 'external'
  }, scxmlEvent);
}

function toTransitionConfigArray(event, configLike) {
  var transitions = toArrayStrict(configLike).map(function (transitionLike) {
    if (typeof transitionLike === 'undefined' || typeof transitionLike === 'string' || isMachine(transitionLike)) {
      return {
        target: transitionLike,
        event: event
      };
    }

    return Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(_virtual_tslib_js__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, transitionLike), {
      event: event
    });
  });
  return transitions;
}

function normalizeTarget(target) {
  if (target === undefined || target === _constants_js__WEBPACK_IMPORTED_MODULE_1__["TARGETLESS_KEY"]) {
    return undefined;
  }

  return toArray(target);
}

function reportUnhandledExceptionOnInvocation(originalError, currentError, id) {
  if (!_environment_js__WEBPACK_IMPORTED_MODULE_2__["IS_PRODUCTION"]) {
    var originalStackTrace = originalError.stack ? " Stacktrace was '" + originalError.stack + "'" : '';

    if (originalError === currentError) {
      // tslint:disable-next-line:no-console
      console.error("Missing onError handler for invocation '" + id + "', error was '" + originalError + "'." + originalStackTrace);
    } else {
      var stackTrace = currentError.stack ? " Stacktrace was '" + currentError.stack + "'" : ''; // tslint:disable-next-line:no-console

      console.error("Missing onError handler and/or unhandled exception/promise rejection for invocation '" + id + "'. " + ("Original error: '" + originalError + "'. " + originalStackTrace + " Current error is '" + currentError + "'." + stackTrace));
    }
  }
}

function evaluateGuard(machine, guard, context, _event, state) {
  var guards = machine.options.guards;
  var guardMeta = {
    state: state,
    cond: guard,
    _event: _event
  }; // TODO: do not hardcode!

  if (guard.type === _constants_js__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_GUARD_TYPE"]) {
    return guard.predicate(context, _event.data, guardMeta);
  }

  var condFn = guards[guard.type];

  if (!condFn) {
    throw new Error("Guard '" + guard.type + "' is not implemented on machine '" + machine.id + "'.");
  }

  return condFn(context, _event.data, guardMeta);
}

function toInvokeSource(src) {
  if (typeof src === 'string') {
    return {
      type: src
    };
  }

  return src;
}



/***/ }),

/***/ "./resources/js/components.js":
/*!************************************!*\
  !*** ./resources/js/components.js ***!
  \************************************/
/*! exports provided: nameList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nameList", function() { return nameList; });
var closeIcon = function closeIcon() {
  return "\n  <button type=\"button\" aria-label=\"close\">\n    <svg\n      width=\"16\"\n      height=\"17\"\n      viewBox=\"0 0 16 17\"\n      fill=\"none\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n    >\n      <path\n        opacity=\"0.25\"\n        d=\"M6.10321 8.52844L0.462891 2.62691L2.45707 0.540405L8.09731 6.44189L13.7375 0.540405L15.7317 2.62691L10.0914 8.52844L15.7316 14.4299L13.7375 16.5163L8.09731 10.6149L2.45707 16.5163L0.462977 14.4299L6.10321 8.52844Z\"\n        fill=\"black\"\n      />\n    </svg>\n  </button>\n";
};

var nameDetails = function nameDetails(person) {
  return "".concat(person.name, "<span class=\"hidden sm:inline\">, ").concat(person.age, ", ").concat(person.location, "</span>");
};

var tooltip = function tooltip(person) {
  return "\n  <div id=\"".concat(person.id, "\" class=\"bg-text text-theme tooltip border border-solid border-black text-sm\" role=\"tooltip\">\n    <div class=\"p-6\">\n      <div class=\"float-right sm:hidden\">\n        ").concat(closeIcon(), "\n      </div>\n      <strong>").concat(person.name, "</strong>\n      <br />\n      ").concat(person.age, ", ").concat(person.location, "\n      <p class=\"my-2 italic\">").concat(person.about, "</p>\n      <p class=\"opacity-50\">\n        Source: ").concat(person.source, " ").concat(person.relation ? person.relation : '', "\n      </p>\n    </div>\n  </div>    \n");
};

var name = function name(person) {
  return "<li class=\"nameList__item relative\">\n  <span id=\"name-".concat(person.id, "\"class=\"pr-2 nameList__itemRecord active:text-primary hover:text-primary focus:text-primary\" tabindex=\"0\" aria-describedby=\"").concat(person.id, "\">\n    ").concat(nameDetails(person), "\n    \n  </span>\n  ").concat(tooltip(person), "\n</li>");
};

var nameList = function nameList(names) {
  return "<ul class=\"text-left\">".concat(names.map(function (person) {
    return name(person);
  }).join(''), "</ul>");
};

/***/ }),

/***/ "./resources/js/initialData.json":
/*!***************************************!*\
  !*** ./resources/js/initialData.json ***!
  \***************************************/
/*! exports provided: records, offset, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"records\":[{\"id\":\"recABDzCqNGegU2Jh\",\"fields\":{\"name\":\"\\nSkylar Herbert\",\"age\":\" 5\",\"location\":\" Detroit\\n\\n\",\"about\":\"Michigan’s youngest victim of the coronavirus pandemic\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 19\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recF2vOGxqKDNOxhO\",\"fields\":{\"name\":\"Dar’Yana Dyson\",\"age\":\" 15\",\"location\":\"Location unknown\",\"about\":\" loved music and dancing, and dreamed of someday becoming a cosmetologist. The oldest of four children, she had a wry sense of humor, pranking her siblings even as she was being treated in the hospital. She was handy with technology, too, fixing the family’s PlayStation and often posting videos from her cellphone. Perhaps most of all, she was known for her big, forgiving heart. \\\"You could make her mad,\\\" her mother said, \\\"and she would see the good in you.\\\"\",\"source\":\"https://www.washingtonpost.com/local/daryana-dyson-a-teen-who-loved-music-and-wanted-to-become-a-cosmetologist-dies-of-complications-of-covid-19/2020/05/29/4488412e-a02d-11ea-b5c9-570a91917d8d_story.html\",\"date\":\"May 30, 2020 at 8:00 AM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recbKT2B3ju3uPm3M\",\"fields\":{\"name\":\"\\nIsrael Sauz\",\"age\":\" 22\",\"location\":\" Broken Arrow, Okla.\\n\\n\",\"about\":\"New father\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 5\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recYPJ9Ks1VSjN6eD\",\"fields\":{\"name\":\"\\nHailey Herrera\",\"age\":\" 25\",\"location\":\" New York City\\n\\n\",\"about\":\"Budding therapist with a gift for empathy\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec2Mk7MSsk6f87pc\",\"fields\":{\"name\":\"\\nBassey Offiong\",\"age\":\" 25\",\"location\":\" Michigan\\n\\n\",\"about\":\"Saw friends at their worst but brought out their best\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 28\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recdbkIV9hAr1PHp1\",\"fields\":{\"name\":\"\\nJonathan Crachat Carreira Ferreira\",\"age\":\" 26\",\"location\":\" Newington, Conn.\\n\\n\",\"about\":\"Was pursuing a degree in history and anthropology\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recPX486S522M5RVG\",\"fields\":{\"name\":\"\\nTorrin Jamal Howard\",\"age\":\" 26\",\"location\":\" Waterbury, Conn.\\n\\n\",\"about\":\"Gentle giant, athlete and musician\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recHHZQsAI0O28rtF\",\"fields\":{\"name\":\"\\nLarry Sylvester Hutchinson Jr.\",\"age\":\" 27\",\"location\":\" Terre Haute, Ind.\\n\\n\",\"about\":\"Played football for Terre Haute South\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 17\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recxFNdwN1OQ5Ov5b\",\"fields\":{\"name\":\"Leilani Jordan\",\"age\":\" 27\",\"location\":\"Location unknown\",\"about\":\" was a Giant grocery store employee with an overpowering desire to help others. Nicknamed \\\"Butterfly,\\\" she kept going to work despite the risks, and her mother held her as she died.\",\"source\":\"https://www.washingtonpost.com/nation/2020/04/10/infected-er-doctor-who-died-husbands-arms-was-save-world-kind-human/\",\"date\":\"April 10, 2020 at 3:10 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recGAOM0JobLc3mZ9\",\"fields\":{\"name\":\"Valentina Blackhorse\",\"age\":\" 28\",\"location\":\"Location unknown\",\"about\":\" was an administrative assistant for the Navajo Nation who dreamed of someday leading the entire tribe. Known to her family as a \\\"feisty\\\" enforcer of Navajo customs, she pored over books about her culture, studied Navajo language, performed jingle-dress dances at community powwows, and won the prestigious Miss Western Navajo pageant. Her family wants to raise her 1-year-old daughter in the traditions she held dear.\",\"source\":\"https://www.washingtonpost.com/nation/2020/05/09/navajo-woman-dies-of-coronavirus-at-28/\",\"date\":\"May 9, 2020 at 7:15 AM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recwZcRqECHGlE3BB\",\"fields\":{\"name\":\"\\nValentina Blackhorse\",\"age\":\" 28\",\"location\":\" Kayenta, Ariz.\\n\\n\",\"about\":\"Aspiring leader in the Navajo Nation\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 23\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recvHXBjCIPIWU2S0\",\"fields\":{\"name\":\"\\nRocco Anthony Ward Jr.\",\"age\":\" 29\",\"location\":\" Gloucester City, N.J.\\n\\n\",\"about\":\"Graduate of Gloucester City High School class of 2009\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 9\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec84rXi0kRn0EkXN\",\"fields\":{\"name\":\"\\nDennis Alan Bradt\",\"age\":\" 29\",\"location\":\" Colonie, N.Y.\\n\\n\",\"about\":\"Will be missed at Mad Jack Brewing\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 13\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recQrZedEGANnXutn\",\"fields\":{\"name\":\"\\nMiguel Marte\",\"age\":\" 30\",\"location\":\" New Jersey\\n\\n\",\"about\":\"Former A’s minor-leaguer\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 28\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec86pZvaxSrLRPOV\",\"fields\":{\"name\":\"\\nJanissa Delacruz\",\"age\":\" 31\",\"location\":\" Haverstraw, N.Y.\\n\\n\",\"about\":\"Known for having a smile on her face\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recfUqGTP83kiiqEH\",\"fields\":{\"name\":\"\\nTimothy Branscomb\",\"age\":\" 32\",\"location\":\" Chicago\\n\\n\",\"about\":\"Always busy looking out for others\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recfBNb4v4Fd8yq4F\",\"fields\":{\"name\":\"\\nJéssica Beatriz Cortez\",\"age\":\" 32\",\"location\":\" Los Angeles\\n\\n\",\"about\":\"Immigrated to the United States three years ago\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 28\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recGgZPHZELUXnqob\",\"fields\":{\"name\":\"\\nKimarlee Nguyen\",\"age\":\" 33\",\"location\":\" Everett, Mass.\\n\\n\",\"about\":\"Writer who inspired her Brooklyn high school students\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 5\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recgXLpJLW07vkPW1\",\"fields\":{\"name\":\"\\nLatasha Andrews\",\"age\":\" 33\",\"location\":\" New Jersey\\n\\n\",\"about\":\"Always the first to offer help to those in need\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 24\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recjsQAr1jJfOJmLV\",\"fields\":{\"name\":\"\\nApril Dunn\",\"age\":\" 33\",\"location\":\" Baton Rouge, La.\\n\\n\",\"about\":\"Advocate for disability rights\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 28\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec1wLG06EpByS8qP\",\"fields\":{\"name\":\"April Dunn\",\"age\":\" 33\",\"location\":\"Location unknown\",\"about\":\" center, was an outspoken disability rights advocate in Louisiana state government. Denied a high school diploma and shut out of jobs because of her disabilities, she helped rewrite state law to make sure people like her had equal access to education and employment.\",\"source\":\"https://www.washingtonpost.com/nation/2020/04/16/nathel-burtley-flint-first-black-superintendent-died-after-contracting-coronavirus/\",\"date\":\"April 16, 2020 at 7:00 AM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec4BHeB1flBOOA0m\",\"fields\":{\"name\":\"\\nKyra Swartz\",\"age\":\" 33\",\"location\":\" New York\\n\\n\",\"about\":\"Volunteered for pet rescue organizations\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec7Xb6JJfdVzPt7i\",\"fields\":{\"name\":\"\\nLuke Workoff\",\"age\":\" 33\",\"location\":\" Huntington, N.Y.\\n\\n\",\"about\":\"His relentless passion was for his family and friends\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recrwoGpYnjeariCS\",\"fields\":{\"name\":\"\\nKrist Angielen Guzman\",\"age\":\" 35\",\"location\":\" Bolingbrook, Ill.\\n\\n\",\"about\":\"Fierce and vivacious\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 2\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec2Ol8aQRb9MvQH1\",\"fields\":{\"name\":\"\\nIjeoma Afuke\",\"age\":\" 35\",\"location\":\" Chicago\\n\\n\",\"about\":\"Nigerian immigrant studying to become a nurse\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recyQ6c6EaOXjwNAp\",\"fields\":{\"name\":\"\\nDez-Ann Romain\",\"age\":\" 36\",\"location\":\" New York City\\n\\n\",\"about\":\"Innovative high school principal\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 23\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recxdhHuFhI8Ewt4Y\",\"fields\":{\"name\":\"\\nJosé Díaz- Ayala\",\"age\":\" 38\",\"location\":\" Palm Beach, Fla.\\n\\n\",\"about\":\"Served with the Palm Beach County Sheriff’s Office for 14 years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recS6QAeLRSVSg1yD\",\"fields\":{\"name\":\"\\nRandall Clayton French\",\"age\":\" 39\",\"location\":\" Troy, N.Y.\\n\\n\",\"about\":\"Police detective who was once a firefighter\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 30\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recAETKwqgW1Ropkk\",\"fields\":{\"name\":\"\\nFred the Godson\",\"age\":\" 41\",\"location\":\" New York City\\n\\n\",\"about\":\"Rapper known for sharp wordplay\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 23\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recgBLkaLla8pXYjG\",\"fields\":{\"name\":\"\\nEmmy Falta\",\"age\":\" 41\",\"location\":\" New York\\n\\n\",\"about\":\"Staff member at Trinity Elementary School in New Rochelle\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reciI4Az9HVwRhfkm\",\"fields\":{\"name\":\"\\nEugene Lamar Limbrick\",\"age\":\" 41\",\"location\":\" Colorado Springs\\n\\n\",\"about\":\"Loved automobiles, especially trucks\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 5\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reckamVJOkwa7qj1u\",\"fields\":{\"name\":\"\\nJohn Schoffstall\",\"age\":\" 41\",\"location\":\" Terre Haute, Ind.\\n\\n\",\"about\":\"Volunteer youth football coach\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 12\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recpuzHxTr2C0rFq2\",\"fields\":{\"name\":\"\\nFerdi German\",\"age\":\" 41\",\"location\":\" Poughkeepsie, N.Y.\\n\\n\",\"about\":\"Subway car inspector in Manhattan\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 16\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recVHJRgCb4R9O6V4\",\"fields\":{\"name\":\"\\nNikima Thompson\",\"age\":\" 41\",\"location\":\" Broward County, Fla.\\n\\n\",\"about\":\"Sheriff’s dispatcher\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rechSLVPqDZ8mHxmq\",\"fields\":{\"name\":\"\\nRonaldo Ferrari\",\"age\":\" 42\",\"location\":\" Berlin, Conn.\\n\\n\",\"about\":\"Young, healthy guy who took care of himself\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 17\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recixsZROVCb6C7ye\",\"fields\":{\"name\":\"\\nOscar López Acosta\",\"age\":\" 42\",\"location\":\" Morrow County, Ohio\\n\\n\",\"about\":\"Died after being released from ICE detention\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 10\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recwgdrCvs5GHxuKE\",\"fields\":{\"name\":\"\\nMarcus Pino Sr.\",\"age\":\" 42\",\"location\":\" Alamo, N.M.\\n\\n\",\"about\":\"He deserved the title Coach\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 16\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recBntMErzGSJFfmH\",\"fields\":{\"name\":\"\\nKenneth Saunders III\",\"age\":\" 43\",\"location\":\" Decatur, Ga.\\n\\n\",\"about\":\"Civic leader and mediating force\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 18\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recISeeECbdZsg0uW\",\"fields\":{\"name\":\"\\nSuchendra Singh\",\"age\":\" 43\",\"location\":\" Pawtucket, R.I.\\n\\n\",\"about\":\"Worked at the Memorial Hospital of Rhode Island for 23 years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recfX4asu29owRk8F\",\"fields\":{\"name\":\"\\nThomas Kevin Milo Jr.\",\"age\":\" 43\",\"location\":\" Westchester County, N.Y.\\n\\n\",\"about\":\"Avid reader, an accomplished chess player and an exceptional marksman\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recfC2lJcXCDcUjhD\",\"fields\":{\"name\":\"Wogene Debele\",\"age\":\" 43\",\"location\":\"Location unknown\",\"about\":\" was a stay-at-home mother of three who never got to meet her fourth, a baby boy who was whisked to the NICU right after his birth because she had covid-19. In Debele’s native Amharic, her name meant \\\"my people, my community.\\\" Her dedication to both was why she quickly became a warm and familiar presence within the Washington area’s large Ethiopian community after her family emigrated from Addis Ababa, Ethiopia, almost a decade ago.\",\"source\":\"https://www.washingtonpost.com/nation/2020/05/04/paramedic-coronavirus-death/\",\"date\":\"May 4, 2020 at 6:41 AM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recnQbiCDWkjLEpOv\",\"fields\":{\"name\":\"\\nWogene Debele\",\"age\":\" 43\",\"location\":\" Baltimore\\n\\n\",\"about\":\"Mother outlived by her newborn\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 21\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recN22zpZwnmfxBI0\",\"fields\":{\"name\":\"\\nMarylou Armer\",\"age\":\" 43\",\"location\":\" Sonoma Valley, Calif.\\n\\n\",\"about\":\"Veteran police detective\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 31\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recTFqamfPnZLnFbK\",\"fields\":{\"name\":\"\\nJana Prince\",\"age\":\" 43\",\"location\":\" Gretna, La.\\n\\n\",\"about\":\"Social worker who dedicated her life to others\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recV0OvhARQxQfyYt\",\"fields\":{\"name\":\"Marylou Armer\",\"age\":\" 43\",\"location\":\"Location unknown\",\"about\":\" a detective for the Santa Rosa Police Department’s sexual assault and domestic violence unit, was the first California police officer killed by covid-19. She fell ill after being on the job and was denied a test three times, her sister said, inspiring a movement to protect and screen first responders.\",\"source\":\"https://www.washingtonpost.com/opinions/2020/04/18/gil-bailey-brought-music-caribbean-airwaves/?arc404=true\",\"date\":\"no date\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recf6U0VUq6rkU7H7\",\"fields\":{\"name\":\"\\nEric Frazier\",\"age\":\" 44\",\"location\":\" New Orleans\\n\\n\",\"about\":\"Well-regarded bailiff and mentor to colleagues\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 18\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recggsPJmnPUj3G7u\",\"fields\":{\"name\":\"\\nNelson Perdomo\",\"age\":\" 44\",\"location\":\" Middlesex County, N.J.\\n\\n\",\"about\":\"Veteran corrections officer and father of three\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 9\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recowpPQ4pwn3TT4l\",\"fields\":{\"name\":\"\\nCoby Adolph\",\"age\":\" 44\",\"location\":\" Chicago\\n\\n\",\"about\":\"Entrepreneur and adventurer\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rectp0FZSLbjIvkGe\",\"fields\":{\"name\":\"Black N Mild\",\"age\":\" 44\",\"location\":\" New Orleans\\n\\n\",\"about\":\"Bounce D.J. and radio personality.\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 19\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recSuOxd6zfCWoY3p\",\"fields\":{\"name\":\"\\nMary Santiago\",\"age\":\" 44\",\"location\":\" Evanston, Ill.\\n\\n\",\"about\":\"Loved being a mom\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 12\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec26diIwP8KT3AJT\",\"fields\":{\"name\":\"\\nLouvenia Henderson\",\"age\":\" 44\",\"location\":\" Tonawanda, N.Y.\\n\\n\",\"about\":\"Proud single mother of three\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recttRXKlY7k6ROs1\",\"fields\":{\"name\":\"\\nLakisha Willis White\",\"age\":\" 45\",\"location\":\" Orlando, Fla.\\n\\n\",\"about\":\"Was helping to raise some of her dozen grandchildren\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recUBNAdCnbv375KR\",\"fields\":{\"name\":\"Nicky Leake\",\"age\":\" 45; John Leake Jr.\",\"location\":\"Location unknown\",\"about\":\" 40; and Leslie Leake, 74, members of the same D.C.-area family, died within 20 days in the month of April. Nicky was preparing for her destination wedding in Hawaii. John was a cutup, the family clown. Leslie, their mother, was passing her golden days in contentment, doting on her grand- and great-grandchildren, assembling floral arrangements, singing softly to herself. They probably spread the virus to each other at Leslie and her husband’s immaculate old home in Congress Heights, the family’s heartbeat, the place they simply called \\\"the house.\\\"\",\"source\":\"https://www.washingtonpost.com/nation/2020/04/24/twin-brothers-pandemic-coronavirus/\",\"date\":\"April 24, 2020 at 6:16 AM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reccZkuAEyFpyBypL\",\"fields\":{\"name\":\"\\nSean Boynes\",\"age\":\" 46\",\"location\":\" Annapolis, Md.\\n\\n\",\"about\":\"Pharmacy manager with young daughters\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 2\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recKl8JKiWvCiaXdb\",\"fields\":{\"name\":\"Sean Boynes\",\"age\":\" 46\",\"location\":\"Location unknown\",\"about\":\" was a loving father, Air Force veteran and pharmacy manager who helped launch a pharmacy in the Washington, D.C., area that specialized in treating people with chronic illnesses. When the outbreak reached the District, Boynes, who had asthma, kept going to work because he wanted to keep serving his patients. \\\"I’m the only pharmacist,\\\" he told his wife.\",\"source\":\"https://www.washingtonpost.com/history/2020/04/16/he-risked-his-life-photographing-1961-freedom-riders-theodore-gaffney-just-died-coronavirus-92/\",\"date\":\"April 16, 2020 at 5:58 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recKIA6HZGvmJGf7M\",\"fields\":{\"name\":\"\\nMarlon Alston\",\"age\":\" 46\",\"location\":\" Chicago\\n\\n\",\"about\":\"Bus driver and school security guard\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec23N4miUpjYpl8N\",\"fields\":{\"name\":\"\\nRaymond Copeland\",\"age\":\" 46\",\"location\":\" New York City\\n\\n\",\"about\":\"Sanitation worker living his fullest days\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 5\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec46lIfL2QJyKY3I\",\"fields\":{\"name\":\"\\nEdgar Orlando De La Roca\",\"age\":\" 46\",\"location\":\" Peabody, Mass.\\n\\n\",\"about\":\"Passionate Boston sports fan\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 2\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reced78VZFkCDgKaY\",\"fields\":{\"name\":\"\\nSean Christian Keville\",\"age\":\" 47\",\"location\":\" New Providence, N.J.\\n\\n\",\"about\":\"Enjoyed talking sports with family\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 8\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rechWCCe3UjIETRHl\",\"fields\":{\"name\":\"\\nMaria Gibbs\",\"age\":\" 47\",\"location\":\" Burlington County, N.J.\\n\\n\",\"about\":\"Senior corrections police officer\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 22\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec35A7VkLAQeFCgn\",\"fields\":{\"name\":\"\\nLaneeka Barksdale\",\"age\":\" 47\",\"location\":\" Detroit\\n\\n\",\"about\":\"Ballroom dancing star\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 23\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recajrKAcZh7FQ9ry\",\"fields\":{\"name\":\"\\nCedric Dixon\",\"age\":\" 48\",\"location\":\" New York City\\n\\n\",\"about\":\"Police detective in Harlem with a gift for interrogation\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 28\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recwwtwtJj7tvVKdx\",\"fields\":{\"name\":\"\\nPhillip Thomas\",\"age\":\" 48\",\"location\":\" Chicago\\n\\n\",\"about\":\"His Walmart co-workers were like family\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recLPubhXKFbbDsvY\",\"fields\":{\"name\":\"\\nDavis Begaye\",\"age\":\" 48\",\"location\":\" Cudei, N.M.\\n\\n\",\"about\":\"Worked at the Home Depot\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 13\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recRNrfRMQhbaa3PQ\",\"fields\":{\"name\":\"\\nKerri Ann Kennedy-Tompkins\",\"age\":\" 48\",\"location\":\" Garrison, N.Y.\\n\\n\",\"about\":\"Worked as a special education teacher for many years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 10\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recYAVjMWhNbHnodj\",\"fields\":{\"name\":\"\\nKious Kelly\",\"age\":\" 48\",\"location\":\" New York City\\n\\n\",\"about\":\"Nurse in the Covid fight\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 24\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec83AO70k5luxt55\",\"fields\":{\"name\":\"\\nDave Edwards\",\"age\":\" 48\",\"location\":\" New York City\\n\\n\",\"about\":\"College basketball assist wizard\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 23\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recrzAFRrFtaV7e5j\",\"fields\":{\"name\":\"\\nRodrick Samuels\",\"age\":\" 49\",\"location\":\" Orlando, Fla.\\n\\n\",\"about\":\"Never let anyone mess with his younger brother\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 15\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recw4uXkbTBxw19KH\",\"fields\":{\"name\":\"\\nMario Araujo\",\"age\":\" 49\",\"location\":\" Chicago\\n\\n\",\"about\":\"Chicago firefighter\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recLvHKwqIG7WY9RD\",\"fields\":{\"name\":\"\\nJesus Roman Melendez\",\"age\":\" 49\",\"location\":\" New York\\n\\n\",\"about\":\"Famous in family circles for his birria beef stew\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recN4KjQgjFNW8OvY\",\"fields\":{\"name\":\"Chad Capule\",\"age\":\" 49\",\"location\":\" Fond du Lac, Wis.\\n\\n\",\"about\":\"I.T. project manager remembered for his love of trivia.\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec6YpYWeLt9ZNnAQ\",\"fields\":{\"name\":\"\\nLloyd Cornelius Porter\",\"age\":\" 49\",\"location\":\" New York City\\n\\n\",\"about\":\"Owner of the beloved Bread Stuy coffee shop\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recreNwXGF7RKwsBx\",\"fields\":{\"name\":\"\\nMarco DiFranco\",\"age\":\" 50\",\"location\":\" Chicago\\n\\n\",\"about\":\"Police officer who was never at a loss for words\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 2\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recCHXPdzCqYMskFZ\",\"fields\":{\"name\":\"Chianti \\\"Tiki\\\" Jackson Harpool\",\"age\":\" 51\",\"location\":\"Location unknown\",\"about\":\" moved easily from the streets of her native Baltimore, where she once worked as a social worker helping the homeless and drug-addicted, to a political fundraiser in the city with her husband of 12 years. She worked for her neighbor, Baltimore City State’s Attorney Marilyn Mosby, and completed a six-month program at the International Culinary Center in New York before starting a home business called Chianti’s Chocolates.\",\"source\":\"https://www.washingtonpost.com/nation/2020/05/01/carlos-deleon-connecticut-inmate-coronavoris/\",\"date\":\"May 1, 2020 at 8:09 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recGPQLuloSHEsMdL\",\"fields\":{\"name\":\"\\nAlan Michael Twofoot\",\"age\":\" 51\",\"location\":\" Nashua, N.H.\\n\\n\",\"about\":\"28-year veteran of the United States Army\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 12\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recgAAUULN0CPJwYr\",\"fields\":{\"name\":\"\\nFreda Ocran\",\"age\":\" 51\",\"location\":\" New York City\\n\\n\",\"about\":\"Nurse with a zest for travel and knowledge\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 28\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recQY5lVhry7J4wQj\",\"fields\":{\"name\":\"Freda Ocran\",\"age\":\" 51\",\"location\":\"Location unknown\",\"about\":\" was a nurse to her patients but a regal member of her household in the Bronx and in Ghana. After her hospital shifts, she would ring the doorbell to her own home so her children would carry in her bags. \\\"Don’t you know I’m the queen,\\\" she would tell her two boys and daughter. \\\"The queen did her job.\\\"\",\"source\":\"https://www.washingtonpost.com/local/at-105-dcs-oldest-coronavirus-victim-was-a-woman-of-faith-who-lived-alone-until-she-turned-100/2020/04/28/944da662-88cd-11ea-8ac1-bfb250876b7a_story.html\",\"date\":\"April 28, 2020 at 2:36 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recXlYx1rhMp87P2k\",\"fields\":{\"name\":\"\\nChianti Jackson Harpool\",\"age\":\" 51\",\"location\":\" Baltimore\\n\\n\",\"about\":\"Social worker and then a political fundraiser\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 8\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec2gdmNja4YRMT9M\",\"fields\":{\"name\":\"\\nJose Vazquez\",\"age\":\" 51\",\"location\":\" Chicago\\n\\n\",\"about\":\"Husband and father\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 30\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec8PENmxVvjellDX\",\"fields\":{\"name\":\"\\nJulian Anguiano-Maya\",\"age\":\" 51\",\"location\":\" Chicago\\n\\n\",\"about\":\"Life of the party\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 28\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recGjH1ePmoA78YX4\",\"fields\":{\"name\":\"Adam Schlesinger\",\"age\":\" 52\",\"location\":\"Location unknown\",\"about\":\" co-founded the rock band Fountains of Wayne and racked up many accolades for his music over the years, including Oscar and Golden Globe nominations for writing the title track to the 1996 comedy \\\"That Thing You Do!\\\" and a Grammy nomination in 2003 for the band’s tongue-in-cheek \\\"Stacy’s Mom.\\\"\",\"source\":\"https://www.washingtonpost.com/local/obituaries/john-prine-grammy-winning-bard-of-broken-hearts-and-dirty-windows-dies-at-73-of-coronavirus/2020/04/07/f17d034a-7208-11ea-87da-77a8136c1a6d_story.html\",\"date\":\"April 7, 2020 at 9:47 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"receTAaxcJnDjaipm\",\"fields\":{\"name\":\"\\nTroy Sneed\",\"age\":\" 52\",\"location\":\" Jacksonville, Fla.\\n\\n\",\"about\":\"Grammy-nominated gospel singer and record label founder\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recgrQuiMLUdGpIgg\",\"fields\":{\"name\":\"\\nAlex Ruperto\",\"age\":\" 52\",\"location\":\" Glen Ridge, N.J.\\n\\n\",\"about\":\"Soft-spoken and genuine\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 16\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recj3hPJmlMGfm8Cx\",\"fields\":{\"name\":\"\\nMaria Garcia-Rodelo\",\"age\":\" 52\",\"location\":\" Nevada\\n\\n\",\"about\":\"Would walk her children to school every morning\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 12\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recwCKKGkGcGPvxGC\",\"fields\":{\"name\":\"\\nConrad Warren Buckley\",\"age\":\" 52\",\"location\":\" Clermont, Fla.\\n\\n\",\"about\":\"Proud of recently being promoted to Grampy\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recQZWKT9Mt2ugj7Z\",\"fields\":{\"name\":\"\\nJohn Cofrancesco\",\"age\":\" 52\",\"location\":\" New Jersey\\n\\n\",\"about\":\"Administrator at a nursing facility\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 19\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recTT0yy7dV1QMQo1\",\"fields\":{\"name\":\"\\nSawarrelita Redmond\",\"age\":\" 52\",\"location\":\" Riverdale, Ill.\\n\\n\",\"about\":\"Youngest of 21 siblings\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 20\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recTDJVG37tK0aGYF\",\"fields\":{\"name\":\"\\nAdam Schlesinger\",\"age\":\" 52\",\"location\":\" Poughkeepsie, N.Y.\\n\\n\",\"about\":\"Songwriter for rock, film and the stage\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recWfVUuIGE5Atmh4\",\"fields\":{\"name\":\"Matteo De Cosmo\",\"age\":\" 52\",\"location\":\" New York\\n\\n\",\"about\":\"Art director for the ABC television shows \\\"Emergence,\\\" \\\"Luke Cage\\\" and \\\"The Punisher\\\"\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 21\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recWPNrrwlK3l5CL8\",\"fields\":{\"name\":\"Brian R. Miller\",\"age\":\" 52\",\"location\":\"Location unknown\",\"about\":\" built a career in the Education Department’s Rehabilitation Services Administration after a lifetime of battling for the rights of those living with disabilities. Born with defective retinas, Miller was among the first wave of blind students to sit in classrooms alongside the sighted in the 1970s and 80s. He sang a cappella, was fluent in four languages and vowed to set foot in 100 countries.\",\"source\":\"https://www.washingtonpost.com/local/obituaries/jerry-givens-virginia-executioner-turned-death-penalty-opponent-dies-at-67-of-coronavirus/2020/04/19/c518b54e-8246-11ea-a3eb-e9fc93160703_story.html\",\"date\":\"April 19, 2020 at 8:23 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec7TrqC3MkD20rLq\",\"fields\":{\"name\":\"\\nMauricio Valdivia\",\"age\":\" 52\",\"location\":\" Chicago\\n\\n\",\"about\":\"Wanted everyone to feel welcome\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 9\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recB6SiE2uHMdjDUo\",\"fields\":{\"name\":\"Peter Brown\",\"age\":\" 53\",\"location\":\" New Jersey\\n\\n\",\"about\":\"Manager of the S.W. Brown & Son Funeral Home.\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 11\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recrazYahczIvEDlT\",\"fields\":{\"name\":\"\\nJohn Pope\",\"age\":\" 53\",\"location\":\" Haydenville, Mass.\\n\\n\",\"about\":\"Worked for years at many local nursing homes\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec6QCbtLXkVv8gGs\",\"fields\":{\"name\":\"\\nJoyce Pacubas-Le Blanc\",\"age\":\" 53\",\"location\":\" Darien, Ill.\\n\\n\",\"about\":\"Nurse for more than 30 years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 23\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec6EwyJ9D9X1DXJH\",\"fields\":{\"name\":\"\\nBilly Ross\",\"age\":\" 53\",\"location\":\" Milwaukee\\n\\n\",\"about\":\"Staff member and mentor at the Milwaukee Rescue Mission\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 13\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recDTnuVYzcrwROMN\",\"fields\":{\"name\":\"\\nSherrell Stokes\",\"age\":\" 54\",\"location\":\" Chicago\\n\\n\",\"about\":\"Active in her church\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 13\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recFA0qGU0AMeSbwp\",\"fields\":{\"name\":\"\\nReggie Bagala\",\"age\":\" 54\",\"location\":\" Lockport, La.\\n\\n\",\"about\":\"Republican freshman in the state Legislature\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 9\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reccAWhHoC5wsNHdI\",\"fields\":{\"name\":\"\\nTerrance Burke\",\"age\":\" 54\",\"location\":\" Maryland\\n\\n\",\"about\":\"Inspirational basketball coach\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recdcmlGV3yVchlyc\",\"fields\":{\"name\":\"\\nThomas Cotton\",\"age\":\" 54\",\"location\":\" Philadelphia\\n\\n\",\"about\":\"Self-taught legal wiz\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recffdM7qol1orKmZ\",\"fields\":{\"name\":\"\\nMark Schroeder\",\"age\":\" 54\",\"location\":\" New York\\n\\n\",\"about\":\"Skilled cook\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 22\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recPNLzpBjeN3woJr\",\"fields\":{\"name\":\"Sandra Santos-Vizcaino\",\"age\":\" 54\",\"location\":\" New York City\\n\\n\",\"about\":\"Beloved public school teacher\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 31\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recPGcOQ50ROrhO0Q\",\"fields\":{\"name\":\"\\nLuis Juarez\",\"age\":\" 54\",\"location\":\" Romeoville, Ill.\\n\\n\",\"about\":\"Traveled often in the United States and Mexico\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 18\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec5ppIm2BZiCM0dZ\",\"fields\":{\"name\":\"Jose Mardoqueo Reyes\",\"age\":\" 54\",\"location\":\"Location unknown\",\"about\":\" immigrated to the United States as a refugee from El Salvador with a passion for radio that made him a popular host for the Spanish-speaking audience in the Washington metro region. On weekends, he dragged his equipment to local parks and high-school fields to broadcast soccer matches. His following earned him the ultimate prize: broadcasting D.C. United’s soccer matches in Spanish.\",\"source\":\"https://www.washingtonpost.com/local/jose-mardoqueo-reyes-radio-broadcaster-and-construction-worker-dies-of-covid-19/2020/05/26/f7eab0ca-9a11-11ea-ac72-3841fcc9b35f_story.html\",\"date\":\"May 26, 2020 at 10:16 AM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec6VfBwZT06Vqgca\",\"fields\":{\"name\":\"\\nDarla Eileen Brown\",\"age\":\" 54\",\"location\":\" Sioux City, Iowa\\n\\n\",\"about\":\"Loved dogs, puzzles and books\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 11\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recBB0Ox1ofQXdmkp\",\"fields\":{\"name\":\"\\nRichard Joseph Lenihan Jr.\",\"age\":\" 55\",\"location\":\" Pearl River, N.Y.\\n\\n\",\"about\":\"Man of faith and a proud Irish-American\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 9\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recg7qP1Pt73hPpPt\",\"fields\":{\"name\":\"\\nJoseph T. Cappello\",\"age\":\" 55\",\"location\":\" Melrose Park, Ill.\\n\\n\",\"about\":\"Made his living from police work\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 24\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recpGWyZdb8pN3hn5\",\"fields\":{\"name\":\"\\nMerle C. Dry\",\"age\":\" 55\",\"location\":\" Tulsa, Okla.\\n\\n\",\"about\":\"Ordained minister\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 18\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reczjJ5FwTDnoMCBP\",\"fields\":{\"name\":\"\\nWilliam D. Greeke\",\"age\":\" 55\",\"location\":\" Massachusetts\\n\\n\",\"about\":\"Thought it was important to know a person’s life story\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recqD3PzBHBo0Rbvw\",\"fields\":{\"name\":\"\\nEdward A. Masterson\",\"age\":\" 56\",\"location\":\" Yonkers, N.Y.\\n\\n\",\"about\":\"His family was the most important accomplishment of his life\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 26\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recsTlqSUsrJrdMZA\",\"fields\":{\"name\":\"\\nThomas Waters\",\"age\":\" 56\",\"location\":\" New York City\\n\\n\",\"about\":\"Armed the affordable housing movement with data and analysis\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recxgTNBd30R4m1X6\",\"fields\":{\"name\":\"\\nRandolph Maitz\",\"age\":\" 56\",\"location\":\" Madison, Conn.\\n\\n\",\"about\":\"He loved all animals, music and community bingo\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 2\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recMzdO3pCPTKMrzg\",\"fields\":{\"name\":\"\\nMarty Derer\",\"age\":\" 56\",\"location\":\" New Jersey\\n\\n\",\"about\":\"Loved to referee basketball games\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recMHjMIDHT9mH5Bo\",\"fields\":{\"name\":\"\\nJeffrey Ronald Henry Muzljakovich\",\"age\":\" 56\",\"location\":\" Centerbrook, Conn.\\n\\n\",\"about\":\"Big guy with an even bigger heart\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 15\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recQK1uDs0ae8gl8n\",\"fields\":{\"name\":\"\\nJosephine Tapiru\",\"age\":\" 56\",\"location\":\" Chicago\\n\\n\",\"about\":\"Dedicated nurse\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 18\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recZfgvXvBCp2bYsJ\",\"fields\":{\"name\":\"\\nClark Osojnicki\",\"age\":\" 56\",\"location\":\" Stillwater, Minn.\\n\\n\",\"about\":\"Well known in the world of agility dog training\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec3nUTlQDFCfs1kR\",\"fields\":{\"name\":\"\\nAlvin Elton\",\"age\":\" 56\",\"location\":\" Chicago\\n\\n\",\"about\":\"Followed in his father’s footsteps as a pipefitter\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 22\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec5woincV3uvnR8P\",\"fields\":{\"name\":\"\\nOrlando Moncada\",\"age\":\" 56\",\"location\":\" Bronxville, N.Y.\\n\\n\",\"about\":\"Left Peru and grabbed hold of the American dream\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 12\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec97JeU9sidbfNQN\",\"fields\":{\"name\":\"\\nJohn Joseph Crowe\",\"age\":\" 56\",\"location\":\" Saint Johns, Fla.\\n\\n\",\"about\":\"Bravely fought a monthlong battle with Covid-19\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 14\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recA9IMcgmOcNIGJ7\",\"fields\":{\"name\":\"\\nJonathan Adewumi\",\"age\":\" 57\",\"location\":\" Bayonne, N.J.\\n\\n\",\"about\":\"Uniter of Nigerians in New York\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 17\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recCSJZyzdh5VQsU9\",\"fields\":{\"name\":\"\\nJames W. Landis\",\"age\":\" 57\",\"location\":\" Krocksville, Pa.\\n\\n\",\"about\":\"Loved his truck, Dorney Park, Disney World, model trains and especially California cheeseburgers\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 22\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recHMwWpN8wkkGdQ6\",\"fields\":{\"name\":\"\\nCalvin Richardson Jr.\",\"age\":\" 57\",\"location\":\" La Plata, Md.\\n\\n\",\"about\":\"Therapist for military veterans\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 19\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recIEypPBlIoH04eO\",\"fields\":{\"name\":\"\\nElizabeth Batista\",\"age\":\" 57\",\"location\":\" Waterbury, Conn.\\n\\n\",\"about\":\"Unwavering faith and dedication to the Catholic Church\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recbCqn1S8MOljoIe\",\"fields\":{\"name\":\"\\nLeslie Kalmus\",\"age\":\" 57\",\"location\":\" New Jersey\\n\\n\",\"about\":\"Always the first one out on the dance floor\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rechQoyF6w8wZWHvD\",\"fields\":{\"name\":\"Douglas Hickok\",\"age\":\" 57\",\"location\":\"Location unknown\",\"about\":\" a physician assistant in and out of uniform, was the first service member to die of the coronavirus. The New Jersey Army National Guard captain, baseball fanatic and outdoorsman was the latest of three generations of family members to serve in uniform — and his son will be the fourth.\",\"source\":\"https://www.washingtonpost.com/opinions/2020/04/08/john-prine-was-rare-poet-american-song/?arc404=true\",\"date\":\"no date\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recudn2w9eSLG7qxf\",\"fields\":{\"name\":\"\\nCarlos Ernesto Escobar Mejia\",\"age\":\" 57\",\"location\":\" San Diego\\n\\n\",\"about\":\"Only one in the family unable to get a green card\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recyXJoGYUER1M5SB\",\"fields\":{\"name\":\"\\nPatricia Dowd\",\"age\":\" 57\",\"location\":\" San Jose, Calif.\\n\\n\",\"about\":\"Auditor in Silicon Valley\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"February 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recO9SXhoOq0YZyG8\",\"fields\":{\"name\":\"Tarlach MacNiallais\",\"age\":\" 57\",\"location\":\" New York City\\n\\n\",\"about\":\"Belfast-born fighter for L.B.G.T. and disability rights.\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recOoSyJnwnMuMGGp\",\"fields\":{\"name\":\"\\nDouglas Hickok\",\"age\":\" 57\",\"location\":\" Pennsylvania\\n\\n\",\"about\":\"Military’s first virus casualty\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 28\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recRy4vaWipqZN6xX\",\"fields\":{\"name\":\"\\nVincie Teresa DeRose\",\"age\":\" 57\",\"location\":\" Arlington, Mass.\\n\\n\",\"about\":\"Always had a smile and a twinkle in her eye\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 20\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec84NZOf00kzDOPx\",\"fields\":{\"name\":\"\\nMyra Helen Robinson\",\"age\":\" 57\",\"location\":\" Detroit\\n\\n\",\"about\":\"More adept than many knew\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 8\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recABDvOj4ntQqDQ9\",\"fields\":{\"name\":\"\\nMichael Hill\",\"age\":\" 58\",\"location\":\" Glassboro, N.J.\\n\\n\",\"about\":\"Railroad worker with a big, joyful personality\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 14\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recrfedqUxjGx8irS\",\"fields\":{\"name\":\"\\nRobert Dugal\",\"age\":\" 58\",\"location\":\" Oak Park, Ill.\\n\\n\",\"about\":\"Advocate for others with disabilities\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 9\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recL2GFJwFutI7KBC\",\"fields\":{\"name\":\"\\nTracie L. Heverly\",\"age\":\" 58\",\"location\":\" Sebring, Ohio\\n\\n\",\"about\":\"Loved painting, crocheting and spending time with her family\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 9\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recOTXlUtABIn3T14\",\"fields\":{\"name\":\"\\nFred J. Felella Jr.\",\"age\":\" 58\",\"location\":\" Sugar Grove, Ill.\\n\\n\",\"about\":\"Firefighter and part-time Santa\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 19\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recPfQl8WanbmXm7Z\",\"fields\":{\"name\":\"\\nStewart Markham Fish\",\"age\":\" 58\",\"location\":\" Hingham, Mass.\\n\\n\",\"about\":\"His love of wildlife and the marshes fueled his soul\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recTSPNUZTBDwJUo8\",\"fields\":{\"name\":\"\\nSaul Moreno\",\"age\":\" 58\",\"location\":\" Chicago\\n\\n\",\"about\":\"Restaurant owner\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 15\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec55jlm5TU0oxSre\",\"fields\":{\"name\":\"\\nJerry Manley\",\"age\":\" 58\",\"location\":\" Prince Frederick, Md.\\n\\n\",\"about\":\"Retired police sergeant\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 31\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recEF8R9sqqbMsgvU\",\"fields\":{\"name\":\"\\nWilman Sanchez Cabrera\",\"age\":\" 59\",\"location\":\" New York City\\n\\n\",\"about\":\"Remembered for his successful career as a tango dancer\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recHKBlPTOStlZzXP\",\"fields\":{\"name\":\"\\nLorena Borjas\",\"age\":\" 59\",\"location\":\" New York City\\n\\n\",\"about\":\"Transgender immigrant activist\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 30\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"receah1FE1Z8FryVh\",\"fields\":{\"name\":\"\\nAndreas Koutsoudakis\",\"age\":\" 59\",\"location\":\" New York City\\n\\n\",\"about\":\"Trailblazer for TriBeCa\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recjxzak8lyn6uRse\",\"fields\":{\"name\":\"Hermán G. Carrillo\",\"age\":\" 59\",\"location\":\"Location unknown\",\"about\":\" was chairman of the literary PEN/Faulkner Foundation and a beloved storyteller, telling kaleidoscopic fiction that plumbed the meaning of the Cuban American experience he said he lived. It wasn’t until his death, a week before his 60th birthday, that Carrillo’s fans, friends and husband learned his true identity — a man from Michigan, born in Detroit, with no known Latino heritage.\",\"source\":\"https://www.washingtonpost.com/local/obituaries/joel-kupperman-once-famous-quiz-kid-of-radio-and-tv-dies-at-83-of-coronavirus/2020/05/15/4e88b6c8-95ff-11ea-9f5e-56d8239bf9ad_story.html\",\"date\":\"May 15, 2020 at 2:43 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recv8pe6Zo2zwc7jl\",\"fields\":{\"name\":\"\\nOluwayemisi Ogunnubi\",\"age\":\" 59\",\"location\":\" Chicago\\n\\n\",\"about\":\"Generous, blunt, and forever centered on her family\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 24\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recx2VQqjHPwM1cTy\",\"fields\":{\"name\":\"\\nKen Caley\",\"age\":\" 59\",\"location\":\" San Clemente, Calif.\\n\\n\",\"about\":\"Always ready with a one-liner to lighten the mood\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 15\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recxvJ1oj66jKMSNW\",\"fields\":{\"name\":\"David Ford\",\"age\":\" 59\",\"location\":\" DeWitt Township, Mich.\\n\\n\",\"about\":\"Pastor who \\\"preached with a lot of strength and voice and sweat\\\"\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 21\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recyY8fBfn0kuJI8L\",\"fields\":{\"name\":\"Wallace Roney\",\"age\":\" 59\",\"location\":\" Paterson, N.J.\\n\\n\",\"about\":\"Jazz trumpet virtuoso\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 31\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recMh1CvTGZ1Pu0DR\",\"fields\":{\"name\":\"Wallace Roney\",\"age\":\" 59\",\"location\":\"Location unknown\",\"about\":\" was a Grammy-winning virtuoso of jazz trumpet who was mentored by Miles Davis. He performed with Davis during one of the jazz legend’s final performances.\",\"source\":\"https://www.washingtonpost.com/nation/2020/04/18/denied-diploma-april-dunn-made-sure-other-students-with-disabilities-had-options-she-died-covid-19/\",\"date\":\"April 18, 2020 at 8:53 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recMqHSC8zfRNrJpY\",\"fields\":{\"name\":\"\\nMike Field\",\"age\":\" 59\",\"location\":\" Valley Stream, N.Y.\\n\\n\",\"about\":\"First responder during the 9/11 attacks\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 8\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recRMeQNtQElwSjU0\",\"fields\":{\"name\":\"\\nFloyd Cardoz\",\"age\":\" 59\",\"location\":\" Montclair, N.J.\\n\\n\",\"about\":\"Indian chef of fine dining\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 24\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recS4PpocdTqoZfze\",\"fields\":{\"name\":\"Keith Redding\",\"age\":\" 59\",\"location\":\"Location unknown\",\"about\":\" made friends wherever he went; even the nurses who treated him in his final days at the hospital were charmed by his easy smile and good-natured humor. Keith wore a suit every day to his job as a project manager for an FBI contractor, but he was most at home in biker boots and jeans, playing with his grandchildren or riding his motorcycle. After his death, Keith’s wife allowed doctors to share a rare 3-D image of his lungs in hope that it might aid in the fight against the disease.\",\"source\":\"https://www.washingtonpost.com/nation/2020/04/17/holocaust-survivor-coronavirus/\",\"date\":\"April 17, 2020 at 6:33 AM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec7wqnOGgBSbcfUA\",\"fields\":{\"name\":\"\\nJohn-Sebastian Laird-Hammond\",\"age\":\" 59\",\"location\":\" Washington, D.C.\\n\\n\",\"about\":\"Member of a Franciscan monastery\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 20\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recA3yJxbEV3yWaAL\",\"fields\":{\"name\":\"\\nFrank Gabrin\",\"age\":\" 60\",\"location\":\" New York City\\n\\n\",\"about\":\"Emergency room doctor who died in husband’s arms\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 31\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recFYFnpvZJxhci6O\",\"fields\":{\"name\":\"\\nMichael Miller\",\"age\":\" 60\",\"location\":\" Clinton, Md.\\n\\n\",\"about\":\"Transport worker\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 15\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recFGqQlK29mEneIv\",\"fields\":{\"name\":\"\\nFernando Miteff\",\"age\":\" 60\",\"location\":\" New York City\\n\\n\",\"about\":\"Graffiti artist with a generous spirit\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 12\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recGGAg0keIfQ1M6V\",\"fields\":{\"name\":\"\\nJuan Martinez\",\"age\":\" 60\",\"location\":\" Chicago\\n\\n\",\"about\":\"Surgical technologist\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recIRP6kTkFdxzB9Z\",\"fields\":{\"name\":\"Frank Gabrin\",\"age\":\" 60\",\"location\":\"Location unknown\",\"about\":\" right, became the first emergency room physician in the United States to die of the virus after he treated patients in hard-hit areas in New York and New Jersey. Known for his buoyant Type A personality, he cooked lasagna dinners for his colleagues and wrote two books to help other health-care workers find purpose in their jobs.\",\"source\":\"https://www.washingtonpost.com/local/education/brian-miller-whose-blindness-inspired-a-career-helping-disabled-students-dies-of-covid-19/2020/04/14/36693a36-7e67-11ea-8013-1b6da0e4a2b7_story.html?%20va._4&%20va._4\",\"date\":\"April 14, 2020 at 7:39 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recIs3Q7VyRszcELs\",\"fields\":{\"name\":\"\\nTerri Lynn Clark\",\"age\":\" 60\",\"location\":\" Des Moines\\n\\n\",\"about\":\"Loved photography, fishing, road trips with friends and time with her family\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recaNQdasU285QTGZ\",\"fields\":{\"name\":\"\\nDaniel James Parr\",\"age\":\" 60\",\"location\":\" Cape Cod, Mass.\\n\\n\",\"about\":\"Non-judgmental and empathetic listener\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recbAHMl82CbTroEh\",\"fields\":{\"name\":\"\\nVincent Lionti\",\"age\":\" 60\",\"location\":\" New York City\\n\\n\",\"about\":\"Met Opera violist and youth orchestra conductor\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rech2vV5sR6PeZcBN\",\"fields\":{\"name\":\"\\nJanice Preschel\",\"age\":\" 60\",\"location\":\" Teaneck, N.J.\\n\\n\",\"about\":\"Founded a food pantry\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 30\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reciZAQXi1w29rfsu\",\"fields\":{\"name\":\"\\nHarold Dixon\",\"age\":\" 60\",\"location\":\" Egg Harbor Township, N.J.\\n\\n\",\"about\":\"Coached youth baseball\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 15\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reckl51Lu8BPI6Wiy\",\"fields\":{\"name\":\"\\nSterling E. Matthews\",\"age\":\" 60\",\"location\":\" Midlothian, Va.\\n\\n\",\"about\":\"Cancer survivor who served as a deacon\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 31\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recryTtm8yZ8mDBVL\",\"fields\":{\"name\":\"\\nRosemarie Theresa Torrance\",\"age\":\" 60\",\"location\":\" Wilmington, Del.\\n\\n\",\"about\":\"Outlet to talk about everything and anything\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 26\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recNhgIVEdO3ByU0w\",\"fields\":{\"name\":\"\\nSheena Renee Comfort Miles\",\"age\":\" 60\",\"location\":\" Morton, Miss.\\n\\n\",\"about\":\"Spent her last working days helping those who had the virus\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recPpsYDefTGXTJsC\",\"fields\":{\"name\":\"\\nScott Melter\",\"age\":\" 60\",\"location\":\" Wyoming, Minn.\\n\\n\",\"about\":\"Worked as an engineer with Comcast\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec26srO6rbdCBmdJ\",\"fields\":{\"name\":\"\\nJerry Alford\",\"age\":\" 60\",\"location\":\" Tuscaloosa, Ala.\\n\\n\",\"about\":\"Would talk to anybody about anything\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 22\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec3quC2SwSnr4zXp\",\"fields\":{\"name\":\"\\nTimothy J. Liszewski\",\"age\":\" 60\",\"location\":\" Columbia, S.C.\\n\\n\",\"about\":\"Active member of the South Carolina Progressive Network\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 28\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec3vouELNzZ1Akin\",\"fields\":{\"name\":\"Idris Bey\",\"age\":\" 60\",\"location\":\" New York City\\n\\n\",\"about\":\"E.M.T. and former Marine who rushed to the World Trade Center on 9/11.\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 22\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec7xVed9ZS6WR4g1\",\"fields\":{\"name\":\"Jeff Bagby\",\"age\":\" 60\",\"location\":\"Location unknown\",\"about\":\" was a math whiz, family man and legend in the world of DIY loudspeaker building. He was unfailingly upbeat — even as he endured kidney failure and cancer — and sometimes wore a Superman tee his wife bought him beneath a button-up shirt like Clark Kent.\",\"source\":\"https://www.washingtonpost.com/nation/2020/04/07/larry-rathgeb-head-engineer-behind-first-200-mph-racecar-dies-coronavirus-90/\",\"date\":\"April 24, 2020 at 6:50 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec8UU8hFvTiJwsGL\",\"fields\":{\"name\":\"\\nMichael Albert Shubak\",\"age\":\" 60\",\"location\":\" Coraopolis, Pa.\\n\\n\",\"about\":\"Worked at Goodwill for more than 25 years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 25\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recBExlpl56tRU4NI\",\"fields\":{\"name\":\"\\nDawn M. Peryer\",\"age\":\" 61\",\"location\":\" Plattsburgh, N.Y.\\n\\n\",\"about\":\"Enjoyed bingo, watching TV and spending time with her family\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 22\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recEE881sVboJLAbT\",\"fields\":{\"name\":\"\\nEmmanuel Demetri\",\"age\":\" 61\",\"location\":\" Gloucester, Mass.\\n\\n\",\"about\":\"One of the first in Massachusetts to compete in the Special Olympics\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 30\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recGoCTulJs77MaCU\",\"fields\":{\"name\":\"\\nPatricia Frieson\",\"age\":\" 61\",\"location\":\" Chicago\\n\\n\",\"about\":\"Former nurse\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 16\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recGwrY2xGPiIJJCY\",\"fields\":{\"name\":\"Danny Ray Bierman\",\"age\":\" 61\",\"location\":\" Muscatine, Iowa\\n\\n\",\"about\":\"Avid St. Louis Cardinals and Minnesota Vikings fan.\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 11\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recGFHcCvpOnwpa8Z\",\"fields\":{\"name\":\"\\nThomas A. Real\",\"age\":\" 61\",\"location\":\" Newtown, Pa.\\n\\n\",\"about\":\"Was at peace on his Harley\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 28\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recb8VBoqjX45zCoM\",\"fields\":{\"name\":\"\\nJose Vitelio Gregorio\",\"age\":\" 61\",\"location\":\" New City, N.Y.\\n\\n\",\"about\":\"Helped form an advocacy group for Latino families\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 30\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recdnrgw9i0Wt1GlN\",\"fields\":{\"name\":\"\\nFrancisco Mendez\",\"age\":\" 61\",\"location\":\" Jersey City, N.J.\\n\\n\",\"about\":\"Boxing gym owner and beloved trainer\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 21\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recgav0fiP54bfypw\",\"fields\":{\"name\":\"\\nLinda Nute\",\"age\":\" 61\",\"location\":\" Hazel Crest, Ill.\\n\\n\",\"about\":\"Home helper for many years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 14\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rechPrEJnQI5oNFNw\",\"fields\":{\"name\":\"\\nCraig Franken\",\"age\":\" 61\",\"location\":\" Sioux Falls, S.D.\\n\\n\",\"about\":\"Known for throwing an annual Fourth of July party\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 19\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recnNEqlnRj1epuTJ\",\"fields\":{\"name\":\"\\nWilliam Brett Tracy\",\"age\":\" 61\",\"location\":\" Snellville, Ga.\\n\\n\",\"about\":\"Great mentor to many\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 14\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recpx16oC1PgLXUD6\",\"fields\":{\"name\":\"\\nJoe Diffie\",\"age\":\" 61\",\"location\":\" Nashville\\n\\n\",\"about\":\"Grammy-winning country music star\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recq5DlDhu6cQyFo5\",\"fields\":{\"name\":\"\\nSherman Pittman\",\"age\":\" 61\",\"location\":\" Chicago\\n\\n\",\"about\":\"Dedicated his life to his church and his neighborhood\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recsBnWAeAFIDoCtz\",\"fields\":{\"name\":\"\\nMaria Linda Villanueva Sun\",\"age\":\" 61\",\"location\":\" Newport News, Va.\\n\\n\",\"about\":\"Organized food programs for children in the Philippines\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 25\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rectzxpvxVudHvkbE\",\"fields\":{\"name\":\"\\nLarry Jones\",\"age\":\" 61\",\"location\":\" Chicago\\n\\n\",\"about\":\"Longtime high school referee\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 13\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recvJFR75H5e46oof\",\"fields\":{\"name\":\"Patricia Frieson\",\"age\":\" 61\",\"location\":\"Location unknown\",\"about\":\" left, and Wanda Bailey, 63, were sisters whose lives centered on their large but close-knit family and their deep faith in God. The family was shaken when Patricia became the first patient in Illinois to die of the coronavirus and was further devastated when Wanda died days later.\",\"source\":\"https://www.washingtonpost.com/arts-entertainment/2020/04/23/jennifer-arnold-coronavirus-death/\",\"date\":\"April 23, 2020 at 3:33 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recwcZF3bnEWSnrL7\",\"fields\":{\"name\":\"\\nCharles Jernigan\",\"age\":\" 61\",\"location\":\" Hartford, Conn.\\n\\n\",\"about\":\"Celebrated Hartford Public High School basketball player\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recxDTdbRUnECkWVz\",\"fields\":{\"name\":\"Joe Diffie\",\"age\":\" 61\",\"location\":\"Location unknown\",\"about\":\" was a Grammy-winning artist and icon of mid-90s country music, whose hits included \\\"Honky Tonk Attitude,\\\" \\\"Prop Me Up Beside the Jukebox (If I Die),\\\" \\\"Home\\\" and \\\"Pickup Man.\\\" He inspired the careers of younger singers, who named-checked him in their music and introduced his work to a new generation of fans.\",\"source\":\"https://www.washingtonpost.com/local/obituaries/lee-konitz-groundbreaking-jazz-saxophonist-for-7-decades-dies-of-coronavirus-at-92/2020/04/16/edadf3b2-7fde-11ea-8013-1b6da0e4a2b7_story.html\",\"date\":\"April 16, 2020 at 11:28 AM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec4vIKOlkPw0FhUt\",\"fields\":{\"name\":\"\\nSandra Lee deBlecourt\",\"age\":\" 61\",\"location\":\" Maryland\\n\\n\",\"about\":\"Loved taking care of people\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 30\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recA0uXYzi8nn3ByV\",\"fields\":{\"name\":\"\\nKerry Lehman\",\"age\":\" 62\",\"location\":\" Jackson, Mich.\\n\\n\",\"about\":\"Shining light and an uplifting presence\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 22\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recCmFxJIHP5MyPoC\",\"fields\":{\"name\":\"\\nEdward Ciocca\",\"age\":\" 62\",\"location\":\" White Plains, N.Y.\\n\\n\",\"about\":\"Beloved Westchester deputy fire chief\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recFv60WKVbeTyd82\",\"fields\":{\"name\":\"\\nJulia Martinez\",\"age\":\" 62\",\"location\":\" Lubbock, Texas\\n\\n\",\"about\":\"Enjoyed her friends and listening to music\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recJEHJWYK1QimHR7\",\"fields\":{\"name\":\"\\nJulie Butler\",\"age\":\" 62\",\"location\":\" New York City\\n\\n\",\"about\":\"Veterinarian who served Harlem\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recoP4MWFNxYc1Pke\",\"fields\":{\"name\":\"\\nRandy Wichlacz\",\"age\":\" 62\",\"location\":\" Pulaski, Wis.\\n\\n\",\"about\":\"Served on the Pulaski Polka Days Committee for many years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 8\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recsrDYXgETQPht0e\",\"fields\":{\"name\":\"\\nThomas A. Williams\",\"age\":\" 62\",\"location\":\" Ohio\\n\\n\",\"about\":\"Pioneer in the field of autism research\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 12\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recthmVxZVQexz6se\",\"fields\":{\"name\":\"\\nJohn Nakawatase\",\"age\":\" 62\",\"location\":\" Lincolnwood, Ill.\\n\\n\",\"about\":\"Coach and Scout leader\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recMn1JxKKrqx7Ook\",\"fields\":{\"name\":\"\\nDante Dennis Flagello\",\"age\":\" 62\",\"location\":\" Rome, Ga.\\n\\n\",\"about\":\"His greatest accomplishment was his relationship with his wife\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 8\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recNP0bVWlIqyx7F7\",\"fields\":{\"name\":\"James \\\"Charlie\\\" Mahoney\",\"age\":\" 62\",\"location\":\"Location unknown\",\"about\":\" was an ICU doctor at SUNY Downstate Medical Center for nearly four decades and a friend to all, from the gift-shop cashier to the taxi drivers waiting outside. Mahoney mentored colleagues and cared for patients through the HIV/AIDS epidemic, through 9/11 and through the swine flu. He was on the brink of retirement when covid-19 hit — and his family tried persuading him to bow out. But Mahoney chose to keep working.\",\"source\":\"https://www.washingtonpost.com/nation/2020/05/19/doctor-delayed-retirement-dies/\",\"date\":\"May 19, 2020 at 7:46 AM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recXtF3qWuaWkBSDx\",\"fields\":{\"name\":\"\\nRobert Steven Seldin\",\"age\":\" 62\",\"location\":\" Toms River, N.J.\\n\\n\",\"about\":\"Gentle soul who appreciated the simple things in life\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 30\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec1Zp40Ktn22aija\",\"fields\":{\"name\":\"\\nBrenda Lee Orebaugh\",\"age\":\" 62\",\"location\":\" Dayton, Va.\\n\\n\",\"about\":\"Her passion was geriatric care\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 25\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec3RuxV6ClNu6m3v\",\"fields\":{\"name\":\"\\nGlenn Daniel Bellitto\",\"age\":\" 62\",\"location\":\" New York\\n\\n\",\"about\":\"Town councilman\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 2\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec5MVFv75IJNR9YQ\",\"fields\":{\"name\":\"\\nCarl Redd\",\"age\":\" 62\",\"location\":\" Chicago\\n\\n\",\"about\":\"Squeezed in every moment he could with his only grandchild\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 21\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec5leBJpADR9zIRW\",\"fields\":{\"name\":\"\\nCindy Lou Mack\",\"age\":\" 62\",\"location\":\" Waverly, N.Y.\\n\\n\",\"about\":\"Enjoyed her daily coffee with her mother-in-law\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 8\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec6wwrZCxHgbLBXj\",\"fields\":{\"name\":\"\\nJames Mahoney\",\"age\":\" 62\",\"location\":\" New York City\\n\\n\",\"about\":\"Fought against the Covid-19 pandemic to save patients\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec7kVYqnDQPWlbeT\",\"fields\":{\"name\":\"Alexandra Louise Polansky\",\"age\":\" 62\",\"location\":\" New Jersey\\n\\n\",\"about\":\"Bob Dylan’s No. 1 fan and a lover of nature.\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"receTfdAMBZueDBIm\",\"fields\":{\"name\":\"\\nPerry Buchalter\",\"age\":\" 63\",\"location\":\" Florida\\n\\n\",\"about\":\"Quiet hero\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recfU45mbki5qSD9w\",\"fields\":{\"name\":\"\\nSushil Kumar\",\"age\":\" 63\",\"location\":\" Roslyn Heights, N.Y.\\n\\n\",\"about\":\"Accountant who achieved the American dream by founding a firm\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 14\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recpJPoCdcfBGfLyc\",\"fields\":{\"name\":\"\\nLinda Benedict\",\"age\":\" 63\",\"location\":\" Lakewood, N.J.\\n\\n\",\"about\":\"Well-known for her ready smile\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rectgOkkiZfwvjAp1\",\"fields\":{\"name\":\"\\nPeter P. DeLuise\",\"age\":\" 63\",\"location\":\" New Jersey\\n\\n\",\"about\":\"Talented athlete who played football, baseball and basketball\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 21\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rectwY2aumYQnrTfK\",\"fields\":{\"name\":\"\\nMaria Lopez\",\"age\":\" 63\",\"location\":\" Burbank, Ill.\\n\\n\",\"about\":\"Loved to travel and dance\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recvZKYlznQ7tUmyc\",\"fields\":{\"name\":\"Carlos DeLeon\",\"age\":\" 63\",\"location\":\"Location unknown\",\"about\":\" was the first incarcerated person in Connecticut to die of the virus. He had been approved for early release after a year in prison for illegal firearm possession and hoped to enter a halfway house. DeLeon was a joke-loving handyman with an artist’s eye — and chronic breathing difficulties that made him especially vulnerable.\",\"source\":\"https://www.washingtonpost.com/local/obituaries/steve-dalkowski-hard-throwing-pitcher-and-baseballs-greatest-what-if-story-dies-at-80/2020/04/24/aadf2e8c-8661-11ea-a3eb-e9fc93160703_story.html\",\"date\":\"April 24, 2020 at 7:29 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recybCYHQG5zGfTvp\",\"fields\":{\"name\":\"\\nTheresa Elloie\",\"age\":\" 63\",\"location\":\" New Orleans\\n\\n\",\"about\":\"Renowned for her business making detailed pins and corsages\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 24\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recU5T8MwTWkUH5Kh\",\"fields\":{\"name\":\"\\nAndrew Kowalczyk\",\"age\":\" 63\",\"location\":\" Coral Gables, Fla.\\n\\n\",\"about\":\"A heart of service\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recUHZ2gm3SjQkuf0\",\"fields\":{\"name\":\"Judy Wilson-Griffin\",\"age\":\" 63\",\"location\":\"Location unknown\",\"about\":\" was a \\\"gentle driving force for change\\\" as a perinatal clinical nurse specialist in St. Louis, carrying on her family’s tradition of tenderly nursing black women as they gave life to future generations. The same month she contracted the novel coronavirus, Wilson-Griffin was finalizing her latest endeavor: creating a maternal triage acuity index for pregnant women. On the day she died, Wilson-Griffin was scheduled to get the green light for her project.\",\"source\":\"https://www.washingtonpost.com/health/2020/02/28/what-you-need-know-about-coronavirus/\",\"date\":\"no date\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec31I6zKGH4BXc4w\",\"fields\":{\"name\":\"\\nWanda Bailey\",\"age\":\" 63\",\"location\":\" Crete, Ill.\\n\\n\",\"about\":\"One of nine siblings\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 25\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec6qnfQpRJezD69Y\",\"fields\":{\"name\":\"\\nJohn Poleon\",\"age\":\" 63\",\"location\":\" Erie County, N.Y.\\n\\n\",\"about\":\"Buffalo front-line hospital worker\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 24\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec7IOeVaLo3CQW9k\",\"fields\":{\"name\":\"\\nHarold Davis Jr.\",\"age\":\" 63\",\"location\":\" Chicago\\n\\n\",\"about\":\"Radio host and youth advocate\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 12\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec9QIGnGOA3T1Dd0\",\"fields\":{\"name\":\"\\nIsaias Mendoza\",\"age\":\" 63\",\"location\":\" Evanston, Ill.\\n\\n\",\"about\":\"Often the one to pick out birthday cakes for his children\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recB9Q66i7rnLRbmG\",\"fields\":{\"name\":\"Bob Barnum\",\"age\":\" 64\",\"location\":\"Location unknown\",\"about\":\" was a descendant of circus founder P.T. Barnum, an early LGBTQ activist in Florida and a friend of one of the stars of the 1980s sitcom \\\"The Golden Girls.\\\" He pushed businesses in St. Petersburg, Fla., to broaden their nondiscrimination policies and ensured that the local domestic violence center was knowledgeable about LGBTQ couples.\",\"source\":\"https://www.washingtonpost.com/local/obituaries/donald-kennedy-who-led-stanford-to-rising-national-influence-dies-of-coronavirus-at-88/2020/04/24/f4a69c3e-859a-11ea-a3eb-e9fc93160703_story.html\",\"date\":\"April 24, 2020 at 2:08 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recFyQ233vHottvlp\",\"fields\":{\"name\":\"\\nRicardo Castaneda\",\"age\":\" 64\",\"location\":\" New York City\\n\\n\",\"about\":\"Caricaturist and psychiatrist who served his patients until the end\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 25\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recGn71Xsffy1he2L\",\"fields\":{\"name\":\"\\nRichard J. Conway III\",\"age\":\" 64\",\"location\":\" Amston, Conn.\\n\\n\",\"about\":\"Avid fly fisherman\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 21\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reccn8ejn0mLQo7Uu\",\"fields\":{\"name\":\"\\nMichael I. Sumergrad\",\"age\":\" 64\",\"location\":\" Mansfield, Ohio\\n\\n\",\"about\":\"Enjoyed taking walks through town\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 18\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reclojhzHPVeJVg2O\",\"fields\":{\"name\":\"\\nJoseph W. Hammond\",\"age\":\" 64\",\"location\":\" Chicago\\n\\n\",\"about\":\"Stopped working to look after his aging parents\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recyj2pb0ne3qht61\",\"fields\":{\"name\":\"\\nKatherine Ann Birkmaier\",\"age\":\" 64\",\"location\":\" Bridgeport, Conn.\\n\\n\",\"about\":\"Lifelong career in health care\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 9\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reczKSeJbb2zXyUns\",\"fields\":{\"name\":\"Cristina\",\"age\":\" 64\",\"location\":\" New York City\\n\\n\",\"about\":\"Downtown New York singer with a cult following\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 31\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recLrqNeMvrtlGLIV\",\"fields\":{\"name\":\"\\nFrankie L. Morris Sr.\",\"age\":\" 64\",\"location\":\" Wooster, Ohio\\n\\n\",\"about\":\"Served with the Army National Guard for 20 years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 8\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recMJE4UCsXEUt0A9\",\"fields\":{\"name\":\"\\nBilly Ostland\",\"age\":\" 64\",\"location\":\" Delaware County, Pa.\\n\\n\",\"about\":\"Never far from his motorcycles or hot rods\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recO8GSv3kQPK9JSt\",\"fields\":{\"name\":\"\\nNoel Sinkiat\",\"age\":\" 64\",\"location\":\" Olney, Md.\\n\\n\",\"about\":\"Nurse planning for retirement\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recXYW9WR9R1D0e6V\",\"fields\":{\"name\":\"\\nBob Barnum\",\"age\":\" 64\",\"location\":\" St. Petersburg, Fla.\\n\\n\",\"about\":\"Leader in Florida Pride events\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recY7JHcNgwhufKH3\",\"fields\":{\"name\":\"\\nSteven J. Huber\",\"age\":\" 64\",\"location\":\" Jefferson City, Mo.\\n\\n\",\"about\":\"Loved creating perfect smiles\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec1F97qtfdmSQ0a3\",\"fields\":{\"name\":\"\\nJerome Berrien\",\"age\":\" 64\",\"location\":\" Chicago\\n\\n\",\"about\":\"Enjoyed long drives, late nights and huge meals\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec3gf7rOiQBMEspm\",\"fields\":{\"name\":\"\\nJames Lowell Miller Jr.\",\"age\":\" 64\",\"location\":\" Cedar Rapids, Iowa\\n\\n\",\"about\":\"Known as the bonfire builder\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 14\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec5eXIEd31OGhcmy\",\"fields\":{\"name\":\"\\nRandy G. Addison\",\"age\":\" 64\",\"location\":\" Carrollton, Ga.\\n\\n\",\"about\":\"Survived being shot in the line of duty in 1984\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec7UbvtyVSvH0y2Q\",\"fields\":{\"name\":\"\\nKevin Charles Patz\",\"age\":\" 64\",\"location\":\" Seattle\\n\\n\",\"about\":\"Active in the AIDS Foundation\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 22\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recAwygRXyjBBNxIf\",\"fields\":{\"name\":\"\\nLuis A. Frias\",\"age\":\" 65\",\"location\":\" Las Vegas\\n\\n\",\"about\":\"Performed in renowned venues such as Madison Square Garden\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 25\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recBoJ5qrR9toTq2l\",\"fields\":{\"name\":\"\\nJoseph Yaggi\",\"age\":\" 65\",\"location\":\" Indiana\\n\\n\",\"about\":\"Mentor and friend to many\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 30\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recE8q65wigTcvdMK\",\"fields\":{\"name\":\"\\nJaimala Singh\",\"age\":\" 65\",\"location\":\" Baltimore\\n\\n\",\"about\":\"Interior designer blending Sikhism through her life\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 5\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recFFfbFnzXw2kv6Z\",\"fields\":{\"name\":\"\\nAdelfo Ruiz Calvo\",\"age\":\" 65\",\"location\":\" Sanford, N.C.\\n\\n\",\"about\":\"Employee of the Pilgrim’s Pride poultry processing plant\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recImo3oE10WV1x6r\",\"fields\":{\"name\":\"\\nDale E. Thurman\",\"age\":\" 65\",\"location\":\" Lexington, Ky.\\n\\n\",\"about\":\"Tailor known for his exacting work and strong opinions\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reci8Va1UFcHxQv68\",\"fields\":{\"name\":\"\\nMelford Henson\",\"age\":\" 65\",\"location\":\" Chino, Calif.\\n\\n\",\"about\":\"Fell ill in prison shortly before he was to be released\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reckdP6ombH0IQSQY\",\"fields\":{\"name\":\"\\nRoger Liddell\",\"age\":\" 65\",\"location\":\" Flint, Mich.\\n\\n\",\"about\":\"Brought smiles to everyone he interacted with\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 10\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reck7z46V03cTABLH\",\"fields\":{\"name\":\"\\nThomas Allen Catron\",\"age\":\" 65\",\"location\":\" Adel, Iowa\\n\\n\",\"about\":\"Often at the farm tending to his flock and managing his inventory of acquired wonders\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recmi8AtCpj5FrduM\",\"fields\":{\"name\":\"\\nMary Virginia McKeon\",\"age\":\" 65\",\"location\":\" Chicago\\n\\n\",\"about\":\"Devoured art in every medium\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 26\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recyoowhdgnWFKqax\",\"fields\":{\"name\":\"\\nRobert F. Brady Jr.\",\"age\":\" 65\",\"location\":\" Avon, Mass.\\n\\n\",\"about\":\"Town official in Massachusetts\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recSF47XgrvJGwSge\",\"fields\":{\"name\":\"\\nFlorencio Almazo Morán\",\"age\":\" 65\",\"location\":\" New York City\\n\\n\",\"about\":\"One-man army\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reccd7zm9HNTv6GFr\",\"fields\":{\"name\":\"\\nFloyd Bluntson\",\"age\":\" 66\",\"location\":\" Chicago\\n\\n\",\"about\":\"Go-to person for everybody\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reci47zVh9dcFmNhO\",\"fields\":{\"name\":\"Landon Spradlin\",\"age\":\" 66\",\"location\":\"Location unknown\",\"about\":\" was a Christian preacher and blues guitarist from rural Virginia who traveled to New Orleans annually to practice street ministry. A believer in miraculous healing, Spradlin criticized the media for creating \\\"mass hysteria\\\" over the virus, which he contracted during Mardi Gras. As his family mourned a man known for his tireless missionary work, they also had to contend with critics who attacked Spradlin for his comments about the virus that ultimately killed him.\",\"source\":\"https://www.washingtonpost.com/local/she-gave-birth-to-a-son-before-dying-of-covid-19-she-never-got-to-see-him/2020/04/24/b23c9f0c-85b2-11ea-878a-86477a724bdb_story.html\",\"date\":\"April 24, 2020 at 12:13 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recjXZOGsjebJv4Dh\",\"fields\":{\"name\":\"\\nTony Maldonado\",\"age\":\" 66\",\"location\":\" Waxahachie, Texas\\n\\n\",\"about\":\"Loved old Western movies, Elvis’s music and the Dallas Cowboys\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 26\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recl6XM3r93pgAH3M\",\"fields\":{\"name\":\"\\nGeorge Valentine\",\"age\":\" 66\",\"location\":\" Washington, D.C.\\n\\n\",\"about\":\"Lawyer who mentored others\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recqKorxE46boQoi0\",\"fields\":{\"name\":\"\\nJoseph J. Ingram Jr.\",\"age\":\" 66\",\"location\":\" New Britain, Conn.\\n\\n\",\"about\":\"Endeared himself to his nephews\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 28\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recteKJCbeKW63O9R\",\"fields\":{\"name\":\"\\nDeyrold Arteaga\",\"age\":\" 66\",\"location\":\" Central Valley, N.Y.\\n\\n\",\"about\":\"Made friends everywhere he went\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 9\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recvjGgPZ7VOZBPYp\",\"fields\":{\"name\":\"\\nPaul Cary\",\"age\":\" 66\",\"location\":\" New York City\\n\\n\",\"about\":\"Paramedic who drove to New York to help fight the virus\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 30\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recx6UNk9GmhuZRU6\",\"fields\":{\"name\":\"\\nTimothy H. Gray\",\"age\":\" 66\",\"location\":\" Orleans, Ind.\\n\\n\",\"about\":\"Worked for the Orange County Highway Department\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 9\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recK7RLBPqeHK6ebF\",\"fields\":{\"name\":\"\\nLoida Cruz Arroyo\",\"age\":\" 66\",\"location\":\" Radcliff, Ky.\\n\\n\",\"about\":\"Retired school counselor\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recKwtHm8Axn1qHXs\",\"fields\":{\"name\":\"\\nRichard Alexander Ross Jr.\",\"age\":\" 66\",\"location\":\" Boynton Beach, Fla.\\n\\n\",\"about\":\"Lifelong karate instructor\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 9\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recKBTH1SKcQfPdnS\",\"fields\":{\"name\":\"\\nGerald Cassidy\",\"age\":\" 66\",\"location\":\" Peachtree Corners, Ga.\\n\\n\",\"about\":\"Owner of Shamrock Salvage & Appraisal Inc\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 30\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recMSycsWarqxlJld\",\"fields\":{\"name\":\"\\nNoach Dear\",\"age\":\" 66\",\"location\":\" New York City\\n\\n\",\"about\":\"Combative councilman and judge\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 19\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recMz4GBuRKbx23W2\",\"fields\":{\"name\":\"\\nGerald Glenn\",\"age\":\" 66\",\"location\":\" Richmond, Va.\\n\\n\",\"about\":\"Police officer turned pastor\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 11\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recOfyPRZ9i9lv97m\",\"fields\":{\"name\":\"\\nGary Tillery\",\"age\":\" 66\",\"location\":\" Tulare, Calif.\\n\\n\",\"about\":\"Loved jeeping, camping, barbecuing, building and socializing\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recUlrDudvStlUg79\",\"fields\":{\"name\":\"\\nKelly Doyle Oliver\",\"age\":\" 66\",\"location\":\" Hastings, Neb.\\n\\n\",\"about\":\"Had a passion for cars\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recVLvduSgmM4wTF6\",\"fields\":{\"name\":\"\\nLandon Spradlin\",\"age\":\" 66\",\"location\":\" Concord, N.C.\\n\\n\",\"about\":\"Preacher and blues guitarist\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 25\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recV3ctLcteFQ4CeX\",\"fields\":{\"name\":\"\\nRobert Lee Amos\",\"age\":\" 66\",\"location\":\" Columbus, Ind.\\n\\n\",\"about\":\"Expert marksman and firearms instructor\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recXnLgf5FwIWrP4X\",\"fields\":{\"name\":\"George Valentine\",\"age\":\" 66\",\"location\":\"Location unknown\",\"about\":\" was a longtime lawyer in the D.C. Attorney General’s Office who later worked as a legal adviser to the mayor. A Harvard Law graduate, he mentored young lawyers and served as a foster parent.\",\"source\":\"https://www.washingtonpost.com/politics/they-werent-close-but-new-yorkers-death-from-covid-19-hit-trump-hard/2020/04/15/0c5417b2-7dc1-11ea-a3ee-13e1ae0a3571_story.html\",\"date\":\"April 15, 2020 at 2:41 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec1XKLFUoVLuHr0q\",\"fields\":{\"name\":\"\\nCynthia Whiting\",\"age\":\" 66\",\"location\":\" La Plata, Md.\\n\\n\",\"about\":\"Retiree determined to spoil her granddaughter\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 11\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec1mCMtJQgkJm9ZU\",\"fields\":{\"name\":\"Paul Cary\",\"age\":\" 66\",\"location\":\"Location unknown\",\"about\":\" a lifelong paramedic and firefighter, voluntarily traveled to the epicenter of the U.S. outbreak, driving 27 hours from Colorado to New York City. He spent three weeks helping others before falling ill himself. A procession of ambulances carried his casket home to Denver, where a colleague sent out a final call for Cary and wished him godspeed before promising, \\\"We have the watch from here.\\\"\",\"source\":\"https://washingtonpost.com/local/a-woman-her-brother-and-their-mother-all-lost-to-covid-19-the-viruss-devastating-toll-on-one-dc-area-family/2020/05/02/f0c3403a-8bef-11ea-9dfd-990f9dcc71fc_story.html\",\"date\":\"May 2, 2020 at 1:50 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec98eBkNSdb0kHvq\",\"fields\":{\"name\":\"\\nPeter S. Miguel Jr.\",\"age\":\" 66\",\"location\":\" Nashua, N.H.\\n\\n\",\"about\":\"Very active in the Portuguese community\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 8\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recCRLj8pXdrXgkdV\",\"fields\":{\"name\":\"\\nPeter Sakas\",\"age\":\" 67\",\"location\":\" Northbrook, Ill.\\n\\n\",\"about\":\"Ran an animal hospital\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 30\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recGsDVp87Er7NNXF\",\"fields\":{\"name\":\"\\nKathleen Devon Domenick\",\"age\":\" 67\",\"location\":\" Devon, Pa.\\n\\n\",\"about\":\"Taught elementary school for more than 30 years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 19\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recHG0Q91Tnw3g34C\",\"fields\":{\"name\":\"\\nJames Kevin Malloy\",\"age\":\" 67\",\"location\":\" Oxford, Miss.\\n\\n\",\"about\":\"Sang at countless weddings\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 16\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recb2mEJpqWc4SVA0\",\"fields\":{\"name\":\"\\nDon Whan\",\"age\":\" 67\",\"location\":\" Indiana\\n\\n\",\"about\":\"Sports fan who loved Purdue University\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reccejM7iyB1rQ49y\",\"fields\":{\"name\":\"\\nWalter Everett Barton\",\"age\":\" 67\",\"location\":\" Poughkeepsie, N.Y.\\n\\n\",\"about\":\"Had a passion for cooking, fishing, skiing and cars\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 8\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reccsn08Zj3tTvLXX\",\"fields\":{\"name\":\"\\nJennifer Robin Arnold\",\"age\":\" 67\",\"location\":\" New York City\\n\\n\",\"about\":\"Broadway costume dresser\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recfA4oO0H4qhdiFA\",\"fields\":{\"name\":\"\\nBarry Webber\",\"age\":\" 67\",\"location\":\" New York City\\n\\n\",\"about\":\"General surgeon who volunteered to treat Covid-19 patients\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 18\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recm9X4kTjRmKlN6w\",\"fields\":{\"name\":\"\\nMarie Pino\",\"age\":\" 67\",\"location\":\" Albuquerque\\n\\n\",\"about\":\"Navajo teacher with a sense of duty\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 13\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recqZcKWGkpfLU9lO\",\"fields\":{\"name\":\"\\nAllan Joseph Dickson Jr.\",\"age\":\" 67\",\"location\":\" New Jersey\\n\\n\",\"about\":\"Loved the Jersey Shore music scene\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 5\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recrOc9idhratIaWi\",\"fields\":{\"name\":\"\\nCarla Thompson\",\"age\":\" 67\",\"location\":\" Washington, D.C.\\n\\n\",\"about\":\"Loved art and making cards\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 18\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recuVU9HNtfEkGTBL\",\"fields\":{\"name\":\"\\nMerrick Dowson\",\"age\":\" 67\",\"location\":\" San Francisco Bay Area, Calif.\\n\\n\",\"about\":\"Nothing delighted him more than picking up the bill\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 10\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recxQFJBUpzPAbq63\",\"fields\":{\"name\":\"\\nAngel Escamilla\",\"age\":\" 67\",\"location\":\" Naperville, Ill.\\n\\n\",\"about\":\"Assistant pastor\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recxQ3w26PysCh5nB\",\"fields\":{\"name\":\"\\nCheryl E. Petty\",\"age\":\" 67\",\"location\":\" Columbus, Ind.\\n\\n\",\"about\":\"Loved all animals\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reczY4TPPX49fRZYj\",\"fields\":{\"name\":\"\\nScott Douglas Woodard\",\"age\":\" 67\",\"location\":\" Oakland, Calif.\\n\\n\",\"about\":\"Attended every weekend A’s game, almost without exception\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 18\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recPEq8NpZhYOek2z\",\"fields\":{\"name\":\"Jerry Givens\",\"age\":\" 67\",\"location\":\"Location unknown\",\"about\":\" led the country’s second-busiest execution team for 17 years, presiding over 62 executions, before becoming a prominent opponent of the death penalty. He organized protests, testified before lawmakers and met with incarcerated people, corrections officers and the families of victims.\",\"source\":\"https://www.washingtonpost.com/local/education/zoao-makumbi-a-dc-school-psychologist-is-school-systems-first-confirmed-covid-death/2020/04/21/193b502e-83e0-11ea-878a-86477a724bdb_story.html\",\"date\":\"April 21, 2020 at 5:26 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recSixU938QpGexzW\",\"fields\":{\"name\":\"\\nAntonio Checo\",\"age\":\" 67\",\"location\":\" New York City\\n\\n\",\"about\":\"Social worker\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recSzyczptwUCYa2x\",\"fields\":{\"name\":\"\\nJoseph Graham\",\"age\":\" 67\",\"location\":\" Chicago\\n\\n\",\"about\":\"School custodian and steppin’ aficionado\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 24\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recW4g2bNxEJtwgxr\",\"fields\":{\"name\":\"Jennifer Arnold\",\"age\":\" 67\",\"location\":\"Location unknown\",\"about\":\" was a longtime costume dresser on Broadway for \\\"Phantom of the Opera\\\" and a \\\"New Yorker through and through,\\\" her friends and family said. She lived her life immersed in creativity, spending her childhood summers in an artist’s colony in Woodstock, dancing her way around the world in her 20s and showcasing her late father’s paintings throughout New York City. She worked the final performance of \\\"Phantom\\\" before Broadway went dark — and fell ill days later.\",\"source\":\"https://www.washingtonpost.com/local/from-a-distance-a-farewell-to-a-special-humble-fair-man/2020/04/14/4cb26a16-7e43-11ea-9040-68981f488eed_story.html\",\"date\":\"April 14, 2020 at 12:15 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec2SE8wfQKHbSFA6\",\"fields\":{\"name\":\"\\nMerlene Sue Hughes\",\"age\":\" 67\",\"location\":\" South Sioux City, Neb.\\n\\n\",\"about\":\"Known as the \\\"Bookie,\\\" she would take and place bets on anything\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec5E7paNmqBW7ZFE\",\"fields\":{\"name\":\"\\nSteven P. St. Laurent\",\"age\":\" 67\",\"location\":\" East Syracuse, N.Y.\\n\\n\",\"about\":\"True renaissance man\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 10\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recBs59bqQN4HW2Ox\",\"fields\":{\"name\":\"\\nKim A. Replogle Blanchar\",\"age\":\" 68\",\"location\":\" Avon, Ind.\\n\\n\",\"about\":\"Taught French and etymology for 27 years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 16\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recBJIad7sRXZIOI9\",\"fields\":{\"name\":\"\\nVincent G. Frainee\",\"age\":\" 68\",\"location\":\" Redlands, Calif.\\n\\n\",\"about\":\"Owned Frainee Water Trucks for 44 years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recHFGJFSKaCZJ3Iq\",\"fields\":{\"name\":\"\\nRosa Luna\",\"age\":\" 68\",\"location\":\" California\\n\\n\",\"about\":\"Housekeeper at Riverside Community Hospital for 25 years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recJGXk5jXs9ZxfPh\",\"fields\":{\"name\":\"\\nAudrey Malone\",\"age\":\" 68\",\"location\":\" Chicago\\n\\n\",\"about\":\"Sang gospel music as a member of the Malone Sisters\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recfSFHKduNJER2qu\",\"fields\":{\"name\":\"\\nJolene Blackburn Robison Wahgren\",\"age\":\" 68\",\"location\":\" Oceanport, N.J.\\n\\n\",\"about\":\"Had a dog named Chelsea whom she loved dearly\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recf09GNzHbkjDRR0\",\"fields\":{\"name\":\"\\nTimothy Ross\",\"age\":\" 68\",\"location\":\" Michigan\\n\\n\",\"about\":\"Worked more than 30 years for General Motors\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 13\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recrfEaFebqLQ3Vyr\",\"fields\":{\"name\":\"Daniel Spector\",\"age\":\" 68\",\"location\":\" Memphis\\n\\n\",\"about\":\"Mentor to other Memphis artists\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 31\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recrUcUNCoBr5SNfQ\",\"fields\":{\"name\":\"\\nJohn Fusco\",\"age\":\" 68\",\"location\":\" Rochester, N.Y.\\n\\n\",\"about\":\"Loved the grocery business\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 19\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recuPgQmdtlSzRn50\",\"fields\":{\"name\":\"\\nJames Ronald Conley\",\"age\":\" 68\",\"location\":\" Battle Creek, Mich.\\n\\n\",\"about\":\"Longtime grocery store manager and sports team booster\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recvSaIk5qRwKiTqz\",\"fields\":{\"name\":\"\\nChester Dwulet\",\"age\":\" 68\",\"location\":\" Burlington, Mass.\\n\\n\",\"about\":\"Proud Union Ironworker of Local 7 for 45 years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recLN01Btjbu7vtLL\",\"fields\":{\"name\":\"\\nLoretta Mendoza Dionisio\",\"age\":\" 68\",\"location\":\" Los Angeles\\n\\n\",\"about\":\"Cancer survivor born in the Philippines\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 10\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recNQtIB2fc3vLOuV\",\"fields\":{\"name\":\"\\nJohn McKeon\",\"age\":\" 68\",\"location\":\" Islip, N.Y.\\n\\n\",\"about\":\"Enjoyed a 37-year career with the Rockville Centre Police Department\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 24\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recPo1JnoeldZIwyJ\",\"fields\":{\"name\":\"\\nMilton Sivels Jr.\",\"age\":\" 68\",\"location\":\" Richton Park, Ill.\\n\\n\",\"about\":\"Father figure to hundreds of young men\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 15\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recQh8DoPRRQbQ4bm\",\"fields\":{\"name\":\"\\nLynne Sierra\",\"age\":\" 68\",\"location\":\" Roselle, Ill.\\n\\n\",\"about\":\"Grandmother who was always full of ideas\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recRzw1mT9XRa6F1b\",\"fields\":{\"name\":\"\\nRachel Walters\",\"age\":\" 68\",\"location\":\" Cudei, N.M.\\n\\n\",\"about\":\"Outspoken, loving, caring and compassionate\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 23\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recWeFNrhCB9tOMkn\",\"fields\":{\"name\":\"\\nBill Mantell\",\"age\":\" 68\",\"location\":\" East Meadow, N.Y.\\n\\n\",\"about\":\"Optimist\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 17\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recWm1QL6qdbWQPns\",\"fields\":{\"name\":\"\\nLawrence W. Stedl\",\"age\":\" 68\",\"location\":\" Green Bay, Wis.\\n\\n\",\"about\":\"Truly a free spirit\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec0sznSNGfLWV8bV\",\"fields\":{\"name\":\"\\nRonald W. Lewis\",\"age\":\" 68\",\"location\":\" New Orleans\\n\\n\",\"about\":\"Preserver of the city’s performance traditions\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 20\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec0uqeRlPwfofjCw\",\"fields\":{\"name\":\"\\nBoro Lalich\",\"age\":\" 68\",\"location\":\" Indianapolis\\n\\n\",\"about\":\"Notorious for receiving the most holding calls\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 20\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec12zjkvGlGkjTb1\",\"fields\":{\"name\":\"\\nAlan A. Potanka\",\"age\":\" 68\",\"location\":\" Berlin, Conn.\\n\\n\",\"about\":\"Collector of stamps and coins\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 12\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec3FuJkT57Ejhv7w\",\"fields\":{\"name\":\"\\nParker Knoll\",\"age\":\" 68\",\"location\":\" Indiana\\n\\n\",\"about\":\"A decades-long career in ministry\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 10\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec4GhwnWl40BBSrp\",\"fields\":{\"name\":\"Raymond Kenny\",\"age\":\" 68\",\"location\":\" Lindenhurst, N.Y.\\n\\n\",\"about\":\"Ticket clerk who rose to lead the L.I.R.R.\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 18\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec86mfH99Mm7zlVU\",\"fields\":{\"name\":\"\\nBruce W. Sowalski\",\"age\":\" 68\",\"location\":\" Sand Lake, N.Y.\\n\\n\",\"about\":\"Found his special place at Big Bowman Pond\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 2\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recBbmQ6cQCdJ2PXj\",\"fields\":{\"name\":\"\\nPhil Foglia\",\"age\":\" 69\",\"location\":\" New York City\\n\\n\",\"about\":\"Prosecuted mobsters, drug dealers and corrupt politicians\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 21\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recEaovgtUE5hWr8T\",\"fields\":{\"name\":\"Levie Barkley\",\"age\":\" 69\",\"location\":\" Chicago\\n\\n\",\"about\":\"While revelers did the \\\"Soul Train\\\" line at a wedding, he combined it with \\\"The Worm\\\"\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 15\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recIQ1NOlxgvxqGTG\",\"fields\":{\"name\":\"\\nBarry G. Fisher\",\"age\":\" 69\",\"location\":\" Old Brookville, N.Y.\\n\\n\",\"about\":\"His name was engraved on the Stanley Cup\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 17\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recIYn3xnPiZItBuD\",\"fields\":{\"name\":\"Alan Merrill\",\"age\":\" 69\",\"location\":\" New York City\\n\\n\",\"about\":\"Songwriter of \\\"I Love Rock ’n’ Roll\\\"\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recaLYJUtthOixaEc\",\"fields\":{\"name\":\"\\nSusan C. Menoche\",\"age\":\" 69\",\"location\":\" Lincoln, R.I.\\n\\n\",\"about\":\"Woman of many talents\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 5\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reca2qyEsqs9vXTgs\",\"fields\":{\"name\":\"\\nDouglas Alan Roberts\",\"age\":\" 69\",\"location\":\" Vancouver, Wash.\\n\\n\",\"about\":\"Authority on aviation\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recbnUIcOPM6PUgLu\",\"fields\":{\"name\":\"\\nMichael James Reagan\",\"age\":\" 69\",\"location\":\" Georgetown, Del.\\n\\n\",\"about\":\"Loved music, especially Christmas carols\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reciVyBROtWVYu5cp\",\"fields\":{\"name\":\"\\nKamal Ahmed\",\"age\":\" 69\",\"location\":\" New York City\\n\\n\",\"about\":\"Hotel banquet worker and Bangladeshi leader\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 5\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reclYwesmmfxjFNAv\",\"fields\":{\"name\":\"Allen Y. Lew\",\"age\":\" 69\",\"location\":\"Location unknown\",\"about\":\" was a city-planning executive who built a generation of Washington landmarks with a speed that countered the District government’s reputation for corruption and incompetence. Working for three D.C. mayors, he blasted through bureaucracies to build the city’s premier convention center and Nationals Park. He also rehabbed more than 30 District schools, demanding authority to hire top-shelf contractors to do the work. \\\"People in government aren’t used to this,\\\" he said, \\\"but you pay for performance.\\\"\",\"source\":\"https://www.washingtonpost.com/local/obituaries/allen-lew-hard-driving-dc-city-administrator-dies-at-69-of-coronavirus/2020/06/23/2534ffa8-8a5a-11ea-8ac1-bfb250876b7a_story.html\",\"date\":\"June 23, 2020 at 11:30 AM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recm4bmQg0BA7iA44\",\"fields\":{\"name\":\"Robert M. Shaw\",\"age\":\" 69\",\"location\":\" Beverly, Mass.\\n\\n\",\"about\":\"Loved being Grandpa to his \\\"little man\\\" and \\\"sweet pea\\\"\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reco9YlWjvu7TjpkH\",\"fields\":{\"name\":\"\\nWesley Richard Fahrbach II\",\"age\":\" 69\",\"location\":\" Fremont, Ohio\\n\\n\",\"about\":\"Known for his knowledge of local history\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 10\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rectJzNlcjlQVqMYY\",\"fields\":{\"name\":\"\\nCarol Sue Rubin\",\"age\":\" 69\",\"location\":\" West Bloomfield, Mich.\\n\\n\",\"about\":\"Loved travel, mahjong and crossword puzzles\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 28\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recvIKnirkQZUn5Rd\",\"fields\":{\"name\":\"\\nCatherine Drouin\",\"age\":\" 69\",\"location\":\" Methuen, Mass.\\n\\n\",\"about\":\"Worked for more than two decades as a social worker\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recwy5qILpMTlI1nd\",\"fields\":{\"name\":\"\\nTonna Lee Pratt\",\"age\":\" 69\",\"location\":\" Westernport, Md.\\n\\n\",\"about\":\"Lifelong resident of Westernport\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 9\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recK9ZOhRqDEtaYLu\",\"fields\":{\"name\":\"\\nAzade Kilic\",\"age\":\" 69\",\"location\":\" New York\\n\\n\",\"about\":\"Two-time cancer survivor\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 2\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recO1MKm0mbOvXbXL\",\"fields\":{\"name\":\"\\nMark Blum\",\"age\":\" 69\",\"location\":\" New York City\\n\\n\",\"about\":\"Obie Award-winning stage and screen actor\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 25\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recRijVgT3EdFypEN\",\"fields\":{\"name\":\"\\nMyles Coker\",\"age\":\" 69\",\"location\":\" New York City\\n\\n\",\"about\":\"Freed from life in prison\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 9\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recSPRBIAG4qJkqJi\",\"fields\":{\"name\":\"\\nJoan Cecile Berngen\",\"age\":\" 69\",\"location\":\" Burbank, Ill.\\n\\n\",\"about\":\"Known for her amazing sense of humor\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 14\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recTiWLBsIeCEYS2Z\",\"fields\":{\"name\":\"\\nCelia Yap-Banago\",\"age\":\" 69\",\"location\":\" Kansas City, Mo.\\n\\n\",\"about\":\"Had been planning to retire in April\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 21\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recTXOZNMJjDaE93L\",\"fields\":{\"name\":\"\\nArthur Charles Lindholm\",\"age\":\" 69\",\"location\":\" Minnesota\\n\\n\",\"about\":\"Explored his Scandinavian roots\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recZ5o8EfNuHhFA6q\",\"fields\":{\"name\":\"\\nLawrence Nokes\",\"age\":\" 69\",\"location\":\" Maryland\\n\\n\",\"about\":\"Nursing assistant at the center of an outbreak\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 15\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec6z4JZFAp0wywDZ\",\"fields\":{\"name\":\"\\nMichael Lee Jordan\",\"age\":\" 69\",\"location\":\" McLeansville, N.C.\\n\\n\",\"about\":\"Retired from Sears Outlet Stores as an assistant manager\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 10\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec8vJBiXcKFs7b3c\",\"fields\":{\"name\":\"\\nLeon Martin Beels\",\"age\":\" 69\",\"location\":\" Morristown, N.J.\\n\\n\",\"about\":\"Lifelong resident of Parsippany, where he was a friend to everyone\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 8\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recAdlcWYcP2Y9l2h\",\"fields\":{\"name\":\"\\nRosemarie Franzese\",\"age\":\" 70\",\"location\":\" Nevada\\n\\n\",\"about\":\"Former hairstylist and avid New York Yankees fan\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 10\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recBa5qteQx0ZuYmm\",\"fields\":{\"name\":\"\\nFrederick Carl Harris\",\"age\":\" 70\",\"location\":\" Massachusetts\\n\\n\",\"about\":\"An exuberant laugh\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 25\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recFBXt5MDLsTRcVu\",\"fields\":{\"name\":\"\\nRonald Clark\",\"age\":\" 70\",\"location\":\" Ballston Lake, N.Y.\\n\\n\",\"about\":\"Longtime soccer referee\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 23\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recGMYVZ8suqNqhZQ\",\"fields\":{\"name\":\"\\nJeffrey Stanley Lin\",\"age\":\" 70\",\"location\":\" Middletown, N.J.\\n\\n\",\"about\":\"Tried to make everyone around him laugh\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 23\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recHQI6yk53jzCOkc\",\"fields\":{\"name\":\"\\nRobert Woodward\",\"age\":\" 70\",\"location\":\" Phenix City, Ala.\\n\\n\",\"about\":\"Raised and trained Labrador retrievers for search and rescue operations\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recJjVHVK1P5qp8c4\",\"fields\":{\"name\":\"\\nLaurie Appell\",\"age\":\" 70\",\"location\":\" Hartford, Conn.\\n\\n\",\"about\":\"Worked tirelessly as a mental health advocate\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 16\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recJNYy5zd7p7QzY9\",\"fields\":{\"name\":\"\\nEllen Elizabeth Fabry\",\"age\":\" 70\",\"location\":\" Burlington, N.J.\\n\\n\",\"about\":\"Enjoyed family dinners and celebrations\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 26\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reciK2fgH0H4GdXDu\",\"fields\":{\"name\":\"\\nDonald DiPetrillo\",\"age\":\" 70\",\"location\":\" Florida\\n\\n\",\"about\":\"Emergency worker in the Seminole Tribe\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 30\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reclvdxCn8uPBFqUg\",\"fields\":{\"name\":\"\\nEllen Spencer\",\"age\":\" 70\",\"location\":\" Newburgh, N.Y.\\n\\n\",\"about\":\"Principal’s assistant\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 14\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rectGSJBJdzg9vYgi\",\"fields\":{\"name\":\"\\nJohn Cassano\",\"age\":\" 70\",\"location\":\" Palos Park, Ill.\\n\\n\",\"about\":\"Family jokester\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 5\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reczSslG2OuqlxxfR\",\"fields\":{\"name\":\"\\nPaul Martinez\",\"age\":\" 70\",\"location\":\" West Covina, Calif.\\n\\n\",\"about\":\"Los Angeles sports fan\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 18\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reczGlTeO5hzDDuhq\",\"fields\":{\"name\":\"\\nGaetano Lombardo\",\"age\":\" 70\",\"location\":\" Rockland County, N.Y.\\n\\n\",\"about\":\"Exceptional billiard player\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 20\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recOXAl09tzEGU4Uw\",\"fields\":{\"name\":\"\\nJanice Lin Bisley\",\"age\":\" 70\",\"location\":\" Bristol, Conn.\\n\\n\",\"about\":\"Favorite of all her nieces and nephews\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 13\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recS1Pa7CJRpCPNSJ\",\"fields\":{\"name\":\"\\nPhilemon Najieb\",\"age\":\" 70\",\"location\":\" Chicago\\n\\n\",\"about\":\"Artist, photographer and mentor\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 15\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recCHjKWKzV0jsRrN\",\"fields\":{\"name\":\"\\nEdward J. Deasy Jr.\",\"age\":\" 71\",\"location\":\" Charlottesville, Va.\\n\\n\",\"about\":\"Extraordinary photographer, amateur radio operator and gifted musician\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recDJfMWxNElOVixk\",\"fields\":{\"name\":\"Michael Sorkin\",\"age\":\" 71\",\"location\":\"Location unknown\",\"about\":\" was a fiery champion of social justice and sustainability in architecture and urban planning. He emerged as one of his profession’s most incisive public intellectuals over a multifaceted career as a critic, author, teacher and designer. Sorkin was an architectural gadfly, known for biting attacks on structures that he deemed pretentious or lacking in social purpose.\",\"source\":\"https://www.washingtonpost.com/opinions/2020/04/02/adam-schlesinger-wrote-great-songs-helped-us-understand-why-we-loved-them/?arc404=true\",\"date\":\"no date\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recFX0CnD7u0PRtPK\",\"fields\":{\"name\":\"\\nMichael Sorkin\",\"age\":\" 71\",\"location\":\" New York City\\n\\n\",\"about\":\"Champion of social justice through architecture\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 26\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recJbvSPxMiuKdBc6\",\"fields\":{\"name\":\"\\nJohn C. West Jr.\",\"age\":\" 71\",\"location\":\" Camden, S.C.\\n\\n\",\"about\":\"Avid observer and participant in South Carolina politics\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 25\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recaKYb3qp6SoqYSM\",\"fields\":{\"name\":\"\\nNola Kathleen LaBudde\",\"age\":\" 71\",\"location\":\" Smyrna, Ga.\\n\\n\",\"about\":\"Presented quilts annually at the East Cobb Quilting Guild Show\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 16\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recfVRNAsynFVXKBC\",\"fields\":{\"name\":\"\\nSteven L. Freedman\",\"age\":\" 71\",\"location\":\" Syosset, N.Y.\\n\\n\",\"about\":\"Always chose to work with the most at-risk students\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 18\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reciNAcjM15n6Y83v\",\"fields\":{\"name\":\"\\nLouise N. Walsh\",\"age\":\" 71\",\"location\":\" Massachusetts\\n\\n\",\"about\":\"Loved karaoke, dancing, singing and playing bingo\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 25\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recswO62tuZSvGXqw\",\"fields\":{\"name\":\"\\nJimmy Walters\",\"age\":\" 71\",\"location\":\" Cudei, N.M.\\n\\n\",\"about\":\"Pastor at Navajo Baptist Temple\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rectZyHdbPYCpG94o\",\"fields\":{\"name\":\"\\nAllen Joseph Spinner\",\"age\":\" 71\",\"location\":\" Streamwood, Ill.\\n\\n\",\"about\":\"Loved to don Groucho glasses and tell jokes\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 16\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recNeHxeFdApMQEYI\",\"fields\":{\"name\":\"\\nEastern Stewart Jr.\",\"age\":\" 71\",\"location\":\" Annapolis, Md.\\n\\n\",\"about\":\"Veteran with a gift for peacemaking\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 28\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recRTU8sYbuzjRaEo\",\"fields\":{\"name\":\"\\nTommie Adams\",\"age\":\" 71\",\"location\":\" Chicago\\n\\n\",\"about\":\"Moved antiques for more than 25 years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 8\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recWCm4KNfugMXrgS\",\"fields\":{\"name\":\"\\nTom Ferguson\",\"age\":\" 71\",\"location\":\" Chicago\\n\\n\",\"about\":\"Former art teacher\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 14\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recX2zXjv9od1RpZU\",\"fields\":{\"name\":\"\\nRussell Aucott\",\"age\":\" 71\",\"location\":\" Linwood, N.J.\\n\\n\",\"about\":\"Had a love of everything automotive\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec57t96cm0Iy9rDY\",\"fields\":{\"name\":\"Martin Douglas\",\"age\":\" 71\",\"location\":\" New York City\\n\\n\",\"about\":\"Maestro of a steel-pan band\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 31\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recCeKq2IEDdB7Y6J\",\"fields\":{\"name\":\"\\nJohn A. Bailargeon\",\"age\":\" 72\",\"location\":\" Dennisport, Mass.\\n\\n\",\"about\":\"True outdoorsman\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recCIF8Pm3PhmJUbf\",\"fields\":{\"name\":\"\\nShidao Wang\",\"age\":\" 72\",\"location\":\" New York City\\n\\n\",\"about\":\"Taught senior citizens computer and Internet skills\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 14\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recbyp6EMiL0pBgy1\",\"fields\":{\"name\":\"\\nRichard Lynn Heggen\",\"age\":\" 72\",\"location\":\" Des Moines\\n\\n\",\"about\":\"If anyone enjoyed the variety life has to offer, he did\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recbDYjGw5rb4Yzmt\",\"fields\":{\"name\":\"Myra Janet Headley\",\"age\":\" 72\",\"location\":\" Memphis\\n\\n\",\"about\":\"Loved Jesus, Elvis, Dr. Pepper and her family.\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 2\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reciiX7JG7RBs3wRn\",\"fields\":{\"name\":\"\\nCynthia Jean Falle\",\"age\":\" 72\",\"location\":\" Troy, N.Y.\\n\\n\",\"about\":\"Teacher passionate about respecting people with different abilities\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 19\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reciM31BKXywDLnXt\",\"fields\":{\"name\":\"\\nEdward Russell Helfrich\",\"age\":\" 72\",\"location\":\" West Keansburg, N.J.\\n\\n\",\"about\":\"Helped friends and neighbors train their dogs\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recr3zQsa8e5KR7PW\",\"fields\":{\"name\":\"\\nMichael Angelo Church\",\"age\":\" 72\",\"location\":\" Plainfield, N.J.\\n\\n\",\"about\":\"Long-term school district employee\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 9\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recu3C7AL7ByWIpvq\",\"fields\":{\"name\":\"\\nJean-Claude Henrion\",\"age\":\" 72\",\"location\":\" Atlantis, Fla.\\n\\n\",\"about\":\"Always rode Harley-Davidsons\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 30\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recwjw49D4RnTcn4s\",\"fields\":{\"name\":\"\\nGeraldine Marie McGovern\",\"age\":\" 72\",\"location\":\" Massachusetts\\n\\n\",\"about\":\"Artist specializing in pastels and sketches\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 5\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recxx0UN9GwzdNvI3\",\"fields\":{\"name\":\"\\nRobby Browne\",\"age\":\" 72\",\"location\":\" New York City\\n\\n\",\"about\":\"Realtor and philanthropist who socialized with celebrities\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 11\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recyzBmYrmDeNvOSU\",\"fields\":{\"name\":\"\\nJim J. Wolf Sr.\",\"age\":\" 72\",\"location\":\" South Holland, Ill.\\n\\n\",\"about\":\"Known as \\\"Big Wolf\\\" to the basketball players he coached\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recLN3WRDcHm4WvXa\",\"fields\":{\"name\":\"\\nAlan Finder\",\"age\":\" 72\",\"location\":\" Ridgewood, N.J.\\n\\n\",\"about\":\"Unflappable New York Times journalist\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 24\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recN9UGt3svsi0DpN\",\"fields\":{\"name\":\"\\nCharles Miles\",\"age\":\" 72\",\"location\":\" Chatham, Ill.\\n\\n\",\"about\":\"Retired therapist and mentor\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recNEGKmwtXXjmPp2\",\"fields\":{\"name\":\"\\nGwendolyn A. Carmichael\",\"age\":\" 72\",\"location\":\" Detroit\\n\\n\",\"about\":\"Definition of love, loyalty, and the ability to serve others\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 14\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recYHzaPGVCGZaEAw\",\"fields\":{\"name\":\"\\nAdam Kovacs\",\"age\":\" 72\",\"location\":\" New York City\\n\\n\",\"about\":\"Cartoonist and an expert on musicals\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 11\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recZ9IHN09cLTqp5K\",\"fields\":{\"name\":\"\\nGeorge Freeman Winfield\",\"age\":\" 72\",\"location\":\" Shelburne, Vt.\\n\\n\",\"about\":\"Could make anything grow\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 23\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recZrlMtAkho32VXR\",\"fields\":{\"name\":\"\\nDonald J. Horsfall\",\"age\":\" 72\",\"location\":\" Rydal, Pa.\\n\\n\",\"about\":\"Co-wrote nine books about computing\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 22\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec2NKvDvoeAshNS5\",\"fields\":{\"name\":\"\\nPeggy Rakestraw\",\"age\":\" 72\",\"location\":\" Matteson, Ill.\\n\\n\",\"about\":\"Loved reading, especially mystery novels\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 25\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec8b10UymKLde7i2\",\"fields\":{\"name\":\"\\nDenise Camille Buczek\",\"age\":\" 72\",\"location\":\" Bristol, Conn.\\n\\n\",\"about\":\"Loved writing birthday and holiday cards, poems and lists\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 10\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec9Gh77LjwqZdMEv\",\"fields\":{\"name\":\"\\nJames David Gewirtzman\",\"age\":\" 72\",\"location\":\" New City, N.Y.\\n\\n\",\"about\":\"Spent some of his happiest hours hiking in the Adirondacks\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recBQCJZKIzWN2sni\",\"fields\":{\"name\":\"\\nWilliam Jonathan Glenney\",\"age\":\" 73\",\"location\":\" Vernon, Conn.\\n\\n\",\"about\":\"The presence of Paul Bunyan and the demeanor of a kitten\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 5\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recJIFNv8bCi14FZf\",\"fields\":{\"name\":\"\\nAntonio Nieves\",\"age\":\" 73\",\"location\":\" Chicago\\n\\n\",\"about\":\"Always seemed to be busy with some home project\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recbopT1pGfPf1IQx\",\"fields\":{\"name\":\"\\nEileen Marie Stanton\",\"age\":\" 73\",\"location\":\" Grand Forks, N.D.\\n\\n\",\"about\":\"Loving stay-at-home mom\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recd39Au593RgJF0n\",\"fields\":{\"name\":\"\\nJohn Watson\",\"age\":\" 73\",\"location\":\" Philadelphia\\n\\n\",\"about\":\"Anywhere he went, he took pictures\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 12\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"receLXYcBEJOCjV9M\",\"fields\":{\"name\":\"\\nRonnie Estes\",\"age\":\" 73\",\"location\":\" Stevensville, Md.\\n\\n\",\"about\":\"Always wanted to be near the ocean\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 2\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rechQhnjTOG1WfIL2\",\"fields\":{\"name\":\"\\nAlbert Petrocelli\",\"age\":\" 73\",\"location\":\" New York City\\n\\n\",\"about\":\"Fire chief who answered the call on 9/11\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recnP9xVd0Ah0z2Hs\",\"fields\":{\"name\":\"\\nRoger Mckinney-Wagner\",\"age\":\" 73\",\"location\":\" Lowell, Mass.\\n\\n\",\"about\":\"Professor at the Salter School\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 8\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recnQszioVMnaXLSR\",\"fields\":{\"name\":\"\\nJohn Prine\",\"age\":\" 73\",\"location\":\" Nashville\\n\\n\",\"about\":\"Country-folk singer who was a favorite of Bob Dylan\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recrV0Lk3ZZfojyAJ\",\"fields\":{\"name\":\"\\nSusan Rokus\",\"age\":\" 73\",\"location\":\" Hamilton, Va.\\n\\n\",\"about\":\"Reading tutor focused on student success\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 25\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recsZcz2qaBUEjNi9\",\"fields\":{\"name\":\"\\nArnold Obey\",\"age\":\" 73\",\"location\":\" San Juan, P.R.\\n\\n\",\"about\":\"Educator and marathoner\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 22\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rectKoeE5mOPgGXpS\",\"fields\":{\"name\":\"Susan Rokus\",\"age\":\" 73\",\"location\":\"Location unknown\",\"about\":\" was a teacher for 55 years. Former students spoke of her lasting influence, friends spoke of her loyalty and love of Italian food, and colleagues spoke of her colorful outfits and distinctive decor ­— especially the leopard-print chair, shaped like a stiletto, that she kept in her classroom.\",\"source\":\"https://www.washingtonpost.com/local/dc-politics/lawyer-from-dc-mayors-office-who-died-from-coronavirus-remembered-for-his-legal-mind-and-willingness-to-mentor/2020/03/27/41b002ee-7052-11ea-b148-e4ce3fbd85b5_story.html\",\"date\":\"March 27, 2020 at 6:41 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recvrrSZDXmZV0j1P\",\"fields\":{\"name\":\"\\nClaudia Obermiller\",\"age\":\" 73\",\"location\":\" Nebraska\\n\\n\",\"about\":\"Deep-hearted country girl\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 9\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recwh13xXlDqcgeQr\",\"fields\":{\"name\":\"\\nJames T. Goodrich\",\"age\":\" 73\",\"location\":\" New York City\\n\\n\",\"about\":\"Surgeon who separated conjoined twins\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 30\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recTKKKGrCZhtDAjd\",\"fields\":{\"name\":\"\\nDalma Holloway Torres\",\"age\":\" 73\",\"location\":\" Uniondale, N.Y.\\n\\n\",\"about\":\"A passion for slot machines\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 21\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recWcEJQqKNJu6Nun\",\"fields\":{\"name\":\"\\nRhoda Hatch\",\"age\":\" 73\",\"location\":\" Chicago\\n\\n\",\"about\":\"First in her family to graduate college\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recXR28hb0f6fEG3p\",\"fields\":{\"name\":\"\\nJosé Torres\",\"age\":\" 73\",\"location\":\" New York City\\n\\n\",\"about\":\"Restaurateur favored by salsa music’s stars\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 8\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recXvxbZpw3sBwUW5\",\"fields\":{\"name\":\"\\nStuart Cohen\",\"age\":\" 73\",\"location\":\" New York City\\n\\n\",\"about\":\"Brooklyn cabbie who found a home in Buddhism\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 8\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recZFdtvdT5GUwnDI\",\"fields\":{\"name\":\"John Prine\",\"age\":\" 73\",\"location\":\"Location unknown\",\"about\":\" was a raspy-voiced heartland troubadour who wrote and performed songs about faded hopes, failing marriages, flies in the kitchen and the desperation of people just getting by. He was, as one of his songs put it, the bard of \\\"broken hearts and dirty windows.\\\"\",\"source\":\"https://www.washingtonpost.com/local/obituaries/wallace-roney-grammy-winning-jazz-trumpeter-dies-of-coronavirus-at-59/2020/04/07/d4374ba8-76ed-11ea-85cb-8670579b863d_story.html\",\"date\":\"April 7, 2020 at 5:35 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec1CwD2amzDuMs3I\",\"fields\":{\"name\":\"\\nMichael Mika\",\"age\":\" 73\",\"location\":\" Chicago\\n\\n\",\"about\":\"Vietnam veteran\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 19\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec30DUhdOOc0nzVb\",\"fields\":{\"name\":\"\\nGeorgianna Glose\",\"age\":\" 73\",\"location\":\" New York City\\n\\n\",\"about\":\"Renegade nun who ran a nonprofit anchor in Brooklyn\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 28\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recE1KQIxcNDHPD0n\",\"fields\":{\"name\":\"\\nBarbara Yazbeck Vethacke\",\"age\":\" 74\",\"location\":\" St. Clair Shores, Mich.\\n\\n\",\"about\":\"She was known to many as Babs\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 5\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recHJ6Q9zUwS0bvNB\",\"fields\":{\"name\":\"James O’Brien Johnson\",\"age\":\" 74\",\"location\":\" Joplin, Mo.\\n\\n\",\"about\":\"Pastor of Mt. Sinai Church of God in Christ.\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recJ9HlDWYyxaOUqk\",\"fields\":{\"name\":\"\\nWilliam Helmreich\",\"age\":\" 74\",\"location\":\" Great Neck, N.Y.\\n\\n\",\"about\":\"Sociologist who walked New York City\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 28\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recbTts2wVhZB4QiK\",\"fields\":{\"name\":\"\\nLeroy Perryman Jr.\",\"age\":\" 74\",\"location\":\" Hazel Crest, Ill.\\n\\n\",\"about\":\"Ultimate entertainer\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 26\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"receKncQ5EH5U0PrS\",\"fields\":{\"name\":\"\\nSharyn Lynn Vogel\",\"age\":\" 74\",\"location\":\" Aurora, Colo.\\n\\n\",\"about\":\"Photographer, gourmet cook, sparkling hostess and traveler\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 9\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recmVPo2fHaXJZ3Ch\",\"fields\":{\"name\":\"\\nJoseph Angeline\",\"age\":\" 74\",\"location\":\" Edison, N.J.\\n\\n\",\"about\":\"Talented painter well known for his landscapes\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recpYYfpnkhgnd7h3\",\"fields\":{\"name\":\"\\nRalph R. Loranger\",\"age\":\" 74\",\"location\":\" Farmington, Conn.\\n\\n\",\"about\":\"Worked in maintenance for the public schools\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 19\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recstxfEOdjwHa9q6\",\"fields\":{\"name\":\"\\nBruce P. Biesenbach Sr.\",\"age\":\" 74\",\"location\":\" Albany, N.Y.\\n\\n\",\"about\":\"Only things he was more proud of than his military service were his children\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 25\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recumMLDgxD6fDJsW\",\"fields\":{\"name\":\"\\nJohn Joseph Reed Jr.\",\"age\":\" 74\",\"location\":\" Edmonds, Wash.\\n\\n\",\"about\":\"Passionate about retaining his town’s small-town atmosphere\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recKocLeBdi2ZEwMV\",\"fields\":{\"name\":\"\\nAnna Marie Lopiccolo\",\"age\":\" 74\",\"location\":\" Bristol, Conn.\\n\\n\",\"about\":\"Served as a Eucharistic minister and lector\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recKqeU0UqKffmKp5\",\"fields\":{\"name\":\"\\nJoAnne Katherine Walther\",\"age\":\" 74\",\"location\":\" Cedar Falls, Iowa\\n\\n\",\"about\":\"Managed Answer Iowa Answering Service in Waterloo for many years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 10\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recPWd9Elg1BDGDYJ\",\"fields\":{\"name\":\"\\nJoel I. Sneider\",\"age\":\" 74\",\"location\":\" Miami Beach\\n\\n\",\"about\":\"A long, successful retail career, primarily at Macy’s\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 13\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recPybeGvJGCIg4jE\",\"fields\":{\"name\":\"\\nKevin Masterson\",\"age\":\" 74\",\"location\":\" New York City\\n\\n\",\"about\":\"Joined Goldman Sachs in 1975\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recQa6bqDEgl0ktNZ\",\"fields\":{\"name\":\"\\nSusan McPherson Gottsegen\",\"age\":\" 74\",\"location\":\" Palm Beach, Fla.\\n\\n\",\"about\":\"Loyal and generous friend to many\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec0VoDSGhVhssIs6\",\"fields\":{\"name\":\"\\nMonica Maley\",\"age\":\" 74\",\"location\":\" Rehoboth Beach, Del.\\n\\n\",\"about\":\"Loved animals, had dogs and cats, and rode horses\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec1qyjRJRxcue6T3\",\"fields\":{\"name\":\"\\nRona Iris Gertz\",\"age\":\" 74\",\"location\":\" New Jersey\\n\\n\",\"about\":\"Involved in the early days of aerobic exercise\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 24\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec4Uzj8Gee6EXuVj\",\"fields\":{\"name\":\"\\nCharles Willis Alston\",\"age\":\" 74\",\"location\":\" Seaford, Del.\\n\\n\",\"about\":\"Hunted and fished and cooked what he caught\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 23\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recAtu49jLSRR3zV4\",\"fields\":{\"name\":\"\\nArthur Louis Thibault\",\"age\":\" 75\",\"location\":\" Andover, Mass.\\n\\n\",\"about\":\"Loved his whole family\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recGLYz3FDqzhzNWL\",\"fields\":{\"name\":\"\\nJoseph J. Deren Jr.\",\"age\":\" 75\",\"location\":\" Turners Falls, Mass.\\n\\n\",\"about\":\"Retired meter-reader\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 30\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recJJvlc0W3rL8wnC\",\"fields\":{\"name\":\"\\nElaine Menchel Marcus\",\"age\":\" 75\",\"location\":\" Syracuse, N.Y.\\n\\n\",\"about\":\"Performed in many productions at the Salt City Playhouse\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 9\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recgvL4VuAaz7sh8l\",\"fields\":{\"name\":\"\\nKenneth Richard Coombs\",\"age\":\" 75\",\"location\":\" Methuen, Mass.\\n\\n\",\"about\":\"A 30-year career at the Gillette Company\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 21\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reciedgRpdKxCOnbL\",\"fields\":{\"name\":\"Robert H. Westphal\",\"age\":\" 75\",\"location\":\" Fond du Lac, Wis.\\n\\n\",\"about\":\"Statesman in the construction industry\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 31\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recjKcDkzb3eoI4lx\",\"fields\":{\"name\":\"\\nJerome Michael Zottolo\",\"age\":\" 75\",\"location\":\" San Diego\\n\\n\",\"about\":\"Many appreciated his straight talk\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 15\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recjXeYppWzxxfkHe\",\"fields\":{\"name\":\"\\nP. Michael Baillargeon\",\"age\":\" 75\",\"location\":\" Massachusetts\\n\\n\",\"about\":\"An esoteric sense of humor\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 9\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reckhWhXLnYUTck4q\",\"fields\":{\"name\":\"\\nAdrienne Eugina Doolin Howard\",\"age\":\" 75\",\"location\":\" Cedar Rapids, Iowa\\n\\n\",\"about\":\"Had a passion for soul food, cooking, music and her church\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 30\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recmCgmyWd0AA5oww\",\"fields\":{\"name\":\"\\nRon Frangipane\",\"age\":\" 75\",\"location\":\" Tinton Falls, N.J.\\n\\n\",\"about\":\"Studio musician in the late ’60s in New York City\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 25\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recn3PRuqo0ixJHKq\",\"fields\":{\"name\":\"\\nRobert Manley Argo Jr.\",\"age\":\" 75\",\"location\":\" South Bay, Calif.\\n\\n\",\"about\":\"Member of Del Amo Flyers\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recqTIrXqVHda0u4D\",\"fields\":{\"name\":\"\\nRegina Dix-Parsons\",\"age\":\" 75\",\"location\":\" Schenectady, N.Y.\\n\\n\",\"about\":\"Stalwart church gospel singer\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recqAeLTdeu5c43xO\",\"fields\":{\"name\":\"Zoao Makumbi Sr.\",\"age\":\" 75\",\"location\":\"Location unknown\",\"about\":\" was an elementary school psychologist in Washington, D.C., who made it his mission to help poor black children get a high-quality education. Born in what is now Congo to Angolan refugees, he was a \\\"freedom fighter\\\" who pushed for Angolan independence before earning a PhD in the United States and landing his dream job in the D.C. public school system.\",\"source\":\"https://www.facebook.com/gilandpatbaileyshow/\",\"date\":\"no date\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recqCZwTiOV3uJGL2\",\"fields\":{\"name\":\"\\nMarilyn Luella Tayse\",\"age\":\" 75\",\"location\":\" Ohio\\n\\n\",\"about\":\"Loved going to the zoo, watching soap operas and window shopping\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 10\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recx5tZ9X1WIKszIf\",\"fields\":{\"name\":\"Steve Joltin\",\"age\":\" 75\",\"location\":\" Rockville, Md.\\n\\n\",\"about\":\"I.T. manager with \\\"an eye for beautiful and unusual things.\\\"\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 11\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recydAThylmlQbf2J\",\"fields\":{\"name\":\"\\nWilliam F. Latimer\",\"age\":\" 75\",\"location\":\" Maryland\\n\\n\",\"about\":\"Worked as a carpenter for more than 40 years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 21\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recONFds8FoPE9yir\",\"fields\":{\"name\":\"\\nJorge F. Casals\",\"age\":\" 75\",\"location\":\" Manchester, Conn.\\n\\n\",\"about\":\"Put himself through college\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 25\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recXmxtpuQ3mxziZu\",\"fields\":{\"name\":\"\\nRoy Horn\",\"age\":\" 75\",\"location\":\" Las Vegas\\n\\n\",\"about\":\"One half of Siegfried & Roy\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 8\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec1WptYyDIE6zMLx\",\"fields\":{\"name\":\"\\nRonald Willenkamp\",\"age\":\" 75\",\"location\":\" Wisconsin\\n\\n\",\"about\":\"Proud to have logged over five million miles behind the wheel\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec24RbXS65d3Dg1S\",\"fields\":{\"name\":\"\\nMarsha Lee Holiday\",\"age\":\" 75\",\"location\":\" North Andover, Mass.\\n\\n\",\"about\":\"Foster mother for over 10 years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec3r1GnBCxnCGN32\",\"fields\":{\"name\":\"\\nZoao Makumbi Sr.\",\"age\":\" 75\",\"location\":\" Lanham, Md.\\n\\n\",\"about\":\"Former Angolan freedom fighter\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 16\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec4lix1yH9In1w4h\",\"fields\":{\"name\":\"\\nTerry G. Thompson\",\"age\":\" 75\",\"location\":\" Indiana\\n\\n\",\"about\":\"Never knew anything but work\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 25\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec9u64UGz5IZXtOF\",\"fields\":{\"name\":\"\\nFred Walter Gray\",\"age\":\" 75\",\"location\":\" Benton County, Wash.\\n\\n\",\"about\":\"Liked his bacon and hash browns crispy\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 20\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recFmFk9qeRh6rWO0\",\"fields\":{\"name\":\"\\nLinda Joy Nassif\",\"age\":\" 76\",\"location\":\" Iowa\\n\\n\",\"about\":\"Rose to leadership of the Republican Party of Iowa\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recFoC61zapO3Zvsu\",\"fields\":{\"name\":\"\\nCarmen Lydia Muniz Rodriguez\",\"age\":\" 76\",\"location\":\" Glastonbury, Conn.\\n\\n\",\"about\":\"Huge Elvis fan\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recHTdm1FHkIEZ5E7\",\"fields\":{\"name\":\"\\nAlexander Leon Lloyd\",\"age\":\" 76\",\"location\":\" Maryland\\n\\n\",\"about\":\"Attended every Presidential inauguration from 1965 until 2012\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recIR42UK4HMrizHj\",\"fields\":{\"name\":\"\\nJohn Timothy Barr\",\"age\":\" 76\",\"location\":\" Rochester Hills, Mich.\\n\\n\",\"about\":\"Trustee for the Retired Detroit Police and Firefighters Association\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recdwyuutn2yatQHI\",\"fields\":{\"name\":\"\\nConstance M. O’Connor\",\"age\":\" 76\",\"location\":\" South Berwick, Maine\\n\\n\",\"about\":\"Followed her passion in breeding dogs\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rechrZdH1WwNl8oXl\",\"fields\":{\"name\":\"\\nJohnnie D. Veasley\",\"age\":\" 76\",\"location\":\" Country Club Hills, Ill.\\n\\n\",\"about\":\"Teacher’s aide\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 8\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recj9T6WhfiH4YJTQ\",\"fields\":{\"name\":\"\\nRichard Kiddle\",\"age\":\" 76\",\"location\":\" Beverly, Mass.\\n\\n\",\"about\":\"Boxing aficionado\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 14\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recqQSjws6CRG0XXQ\",\"fields\":{\"name\":\"\\nWilliam Hrabnicky\",\"age\":\" 76\",\"location\":\" Cleveland\\n\\n\",\"about\":\"Owned a local bar\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 15\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recxqYd8tD3MiA6UR\",\"fields\":{\"name\":\"\\nJohn B. Lynch\",\"age\":\" 76\",\"location\":\" Wilmington, Mass.\\n\\n\",\"about\":\"Lifelong educator\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 12\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recz143rWiXVY6fli\",\"fields\":{\"name\":\"\\nAnne Turner Gaillard\",\"age\":\" 76\",\"location\":\" Mobile, Ala.\\n\\n\",\"about\":\"First woman elected to the Pohick vestry\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reczxgCPmHBEZotjf\",\"fields\":{\"name\":\"\\nGuy A. LaVignera\",\"age\":\" 76\",\"location\":\" Morganville, N.J.\\n\\n\",\"about\":\"Served in the Army and worked 40-plus years at Chase Bank\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 5\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recLdsEZwmjO0pzdz\",\"fields\":{\"name\":\"\\nBarbara Stack\",\"age\":\" 76\",\"location\":\" Perth Amboy, N.J.\\n\\n\",\"about\":\"Created her own version of \\\"meals on wheels\\\" for those in need\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 25\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recR38qjJ8YU9Z6TN\",\"fields\":{\"name\":\"\\nMadeline Kripke\",\"age\":\" 76\",\"location\":\" New York City\\n\\n\",\"about\":\"Collector of dictionaries and lover of words\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 25\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recSTY62n414WGPfD\",\"fields\":{\"name\":\"\\nRichard Emmett Powers\",\"age\":\" 76\",\"location\":\" Detroit\\n\\n\",\"about\":\"Well-respected criminal defense attorney\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 20\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recXzfafBLC1QQ0Cv\",\"fields\":{\"name\":\"\\nCarole Brookins\",\"age\":\" 76\",\"location\":\" Palm Beach, Fla.\\n\\n\",\"about\":\"Early woman on Wall Street and a World Bank official\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 23\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec0QqHhoBsVtgMmN\",\"fields\":{\"name\":\"\\nMartha Leroy Wilson\",\"age\":\" 76\",\"location\":\" Arlington, Va.\\n\\n\",\"about\":\"Spent her youth at foreign service postings\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 16\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec0vPbUGQVhlo3Qu\",\"fields\":{\"name\":\"\\nCarl J. Hebert Sr.\",\"age\":\" 76\",\"location\":\" Manchester, N.H.\\n\\n\",\"about\":\"Engine technician in the New Hampshire Air National Guard\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 12\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec1uvWIR0tIVnohc\",\"fields\":{\"name\":\"\\nAudrey LeMaire Morvant\",\"age\":\" 76\",\"location\":\" Abbeville, La.\\n\\n\",\"about\":\"Enjoyed spending time with her family and reminiscing about her horses\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 23\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec88m7CJJvojDFko\",\"fields\":{\"name\":\"\\nPatricia Gibbons\",\"age\":\" 76\",\"location\":\" Naples, Fla.\\n\\n\",\"about\":\"Nurse working night shifts in the ICU\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 21\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec9rMJ2rf4Q9jL4e\",\"fields\":{\"name\":\"\\nRichard M. Cieslak\",\"age\":\" 76\",\"location\":\" Red Bud, Ill.\\n\\n\",\"about\":\"Successful business owner in construction and recycling\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 2\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recFkvBdkuuPJs2Ik\",\"fields\":{\"name\":\"\\nJermaine Ferro\",\"age\":\" 77\",\"location\":\" Lee County, Fla.\\n\\n\",\"about\":\"Wife with little time to enjoy a new marriage\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 5\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recIXBE1ePh0MoisT\",\"fields\":{\"name\":\"\\nAntoinette Tosco\",\"age\":\" 77\",\"location\":\" Bridgewater, N.J.\\n\\n\",\"about\":\"A long career in horticulture\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 21\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recJ08Aj8n8o9rmDs\",\"fields\":{\"name\":\"\\nRobert Garff\",\"age\":\" 77\",\"location\":\" Utah\\n\\n\",\"about\":\"Former speaker of the Utah House, auto executive and philanthropist\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recdkqdP6hoVyIywp\",\"fields\":{\"name\":\"\\nLucille Marie Resto\",\"age\":\" 77\",\"location\":\" Rocky Hill, Conn.\\n\\n\",\"about\":\"Owned her own small businesses\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 25\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recdqfzYZPMExr0gA\",\"fields\":{\"name\":\"\\nNancy Ferguson\",\"age\":\" 77\",\"location\":\" Chicago\\n\\n\",\"about\":\"True community activist\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 2\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recfLWq6fvVlUwbuH\",\"fields\":{\"name\":\"\\nGary Holmberg\",\"age\":\" 77\",\"location\":\" Mount Airy, Md.\\n\\n\",\"about\":\"Retired firefighter\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recgDalpJpo8Ctf81\",\"fields\":{\"name\":\"\\nEthel R. Fonti\",\"age\":\" 77\",\"location\":\" Beverly, Mass.\\n\\n\",\"about\":\"A zest for life\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 19\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reciSej7snBIV4dYX\",\"fields\":{\"name\":\"John Larry Sartain\",\"age\":\" 77\",\"location\":\" Des Plaines, Ill.\\n\\n\",\"about\":\"Rose each morning at 5 a.m. to read the Bible.\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 18\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recrdoVjXa4dGKefR\",\"fields\":{\"name\":\"\\nJudith Lee Arkerson\",\"age\":\" 77\",\"location\":\" Dover, N.H.\\n\\n\",\"about\":\"Secretary turned tax consultant\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 17\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recrUvJjEeTBih4RD\",\"fields\":{\"name\":\"\\nRobert Michael Sedor\",\"age\":\" 77\",\"location\":\" Hillsborough, N.J.\\n\\n\",\"about\":\"Faithfully served his country with the Air Force\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 25\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recyEuXtlOH6eJPLD\",\"fields\":{\"name\":\"\\nStanley Chera\",\"age\":\" 77\",\"location\":\" New York City\\n\\n\",\"about\":\"Developer and friend of the president\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 11\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recO4bOQpOf9d7qpc\",\"fields\":{\"name\":\"\\nCalvin E. Messner\",\"age\":\" 77\",\"location\":\" Wooster, Ohio\\n\\n\",\"about\":\"Huge fan of Waynedale High School sports\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 30\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recQXAnezmDeLmvck\",\"fields\":{\"name\":\"\\nJames Ventrillo\",\"age\":\" 77\",\"location\":\" Methuen, Mass.\\n\\n\",\"about\":\"Kind and brave man, never forgetful of his roots\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 10\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recR533jofdfysI4Y\",\"fields\":{\"name\":\"\\nJoan M. Heaney\",\"age\":\" 77\",\"location\":\" Upper Brookville, N.Y.\\n\\n\",\"about\":\"Built the family heating-oil business into a successful company\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 13\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recVEfDBzxSeiBbID\",\"fields\":{\"name\":\"\\nPaul Francis Siefert Sr.\",\"age\":\" 77\",\"location\":\" Colerain Township, Ohio\\n\\n\",\"about\":\"Avid, lifelong trap shooter\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recWPLtG5nnV3Vuzy\",\"fields\":{\"name\":\"\\nDon Osceola\",\"age\":\" 77\",\"location\":\" Hollywood, Fla.\\n\\n\",\"about\":\"Decorated Vietnam War veteran and member of the Seminole Tribe\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recWGgjsbZVpkaEOm\",\"fields\":{\"name\":\"\\nVince Woodward\",\"age\":\" 77\",\"location\":\" Columbus, Ga.\\n\\n\",\"about\":\"Decorated Vietnam War veteran\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec02detPCTMZo6Pm\",\"fields\":{\"name\":\"\\nPaul J. Foley Jr.\",\"age\":\" 77\",\"location\":\" Chicago\\n\\n\",\"about\":\"Family man, risk-taker, teaser and sports lover\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 17\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec2qbuWg60wtBsWB\",\"fields\":{\"name\":\"\\nJames Quigley\",\"age\":\" 77\",\"location\":\" Chicago\\n\\n\",\"about\":\"Rebel of the family\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec3ZzB8XUD0zzY27\",\"fields\":{\"name\":\"\\nMalcolm C. Shaw Jr\",\"age\":\" 77\",\"location\":\" Bartlesville, Okla.\\n\\n\",\"about\":\"Spent countless hours coaching baseball in Bartlesville\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 20\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec4RtojUBqGhXlRo\",\"fields\":{\"name\":\"\\nSandra Piotrowski\",\"age\":\" 77\",\"location\":\" Tinley Park, Ill.\\n\\n\",\"about\":\"Leaves behind many lifelong friends, including the Bunco Girls\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 28\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec8ElxFCxYve3AhP\",\"fields\":{\"name\":\"\\nViraf Darukhanawalla\",\"age\":\" 77\",\"location\":\" Hoffman Estates, Ill.\\n\\n\",\"about\":\"Worker at O’Hare International Airport\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recBUO83hqwyloyhs\",\"fields\":{\"name\":\"\\nRobert N. Winsor\",\"age\":\" 78\",\"location\":\" Marblehead, Mass.\\n\\n\",\"about\":\"A 56-year career as a produce manager at Stop and Shop\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recDbHHl7C4JPELrQ\",\"fields\":{\"name\":\"\\nJohn P. Derrico\",\"age\":\" 78\",\"location\":\" Fountain Hill, Pa.\\n\\n\",\"about\":\"Was in charge of The Bethlehem Globe Times’s printing department for many years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recDOOwPzLICappJh\",\"fields\":{\"name\":\"\\nCalvin Harrison\",\"age\":\" 78\",\"location\":\" Florida\\n\\n\",\"about\":\"Seminole Police Department officer\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 17\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recDpAr4PFFq8si0N\",\"fields\":{\"name\":\"\\nMaria Tassiopoulos\",\"age\":\" 78\",\"location\":\" Braintree, Mass.\\n\\n\",\"about\":\"Made the best baklava ever\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 2\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recISOB3LVxcXBHoS\",\"fields\":{\"name\":\"\\nPatricia Yanni\",\"age\":\" 78\",\"location\":\" Geneva, Ill.\\n\\n\",\"about\":\"Wasn’t afraid to try new things\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recbzR1ML5i4KtojZ\",\"fields\":{\"name\":\"\\nDavid Bernstein\",\"age\":\" 78\",\"location\":\" New York City\\n\\n\",\"about\":\"Lifelong political radical\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recbFywX74NIRmmJP\",\"fields\":{\"name\":\"\\nArlene M. Horowitz\",\"age\":\" 78\",\"location\":\" Wynnewood, Pa.\\n\\n\",\"about\":\"Rising phoenix\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recjdyQ9K2TQ7S8eN\",\"fields\":{\"name\":\"\\nArlene Chesley\",\"age\":\" 78\",\"location\":\" La Plata, Md.\\n\\n\",\"about\":\"Cosmetologist who long survived a brain aneurysm\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recjSbJRYPTcKyceZ\",\"fields\":{\"name\":\"Roger Eckart\",\"age\":\" 78\",\"location\":\" Indiana\\n\\n\",\"about\":\"Retired firefighter and old-school barber\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 31\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reckdImwIOJZ5pbBf\",\"fields\":{\"name\":\"\\nKenneth L. Jewel\",\"age\":\" 78\",\"location\":\" Mountain Lakes, N.J.\\n\\n\",\"about\":\"Exceptional radiologist\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 13\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recpZAZ5UWFdaNj6U\",\"fields\":{\"name\":\"\\nCharlie Hopper\",\"age\":\" 78\",\"location\":\" Augusta, Maine\\n\\n\",\"about\":\"Former firefighter\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 17\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recqJbzloa6lsePXs\",\"fields\":{\"name\":\"\\nJames V. Walsh\",\"age\":\" 78\",\"location\":\" New Jersey\\n\\n\",\"about\":\"Volunteered his time to church car raffles, fund-raisers and picnics\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recs1uCJ8gNHJUCob\",\"fields\":{\"name\":\"\\nSterling Maddox Jr.\",\"age\":\" 78\",\"location\":\" Arlington, Va.\\n\\n\",\"about\":\"Developer known for his friendliness\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 24\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recsHj14vMC4VwqBc\",\"fields\":{\"name\":\"\\nCarl Robert Bentley\",\"age\":\" 78\",\"location\":\" Glastonbury, Conn.\\n\\n\",\"about\":\"Collector and talented artist\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 24\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recxDOb91zhYTmg5I\",\"fields\":{\"name\":\"Mario César Romero\",\"age\":\" 78\",\"location\":\" New York City\\n\\n\",\"about\":\"Art historian of East Harlem, N.Y.\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 17\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reczFHxbHXIR94wHO\",\"fields\":{\"name\":\"\\nJack Butler\",\"age\":\" 78\",\"location\":\" Indiana\\n\\n\",\"about\":\"Lived in the house he grew up in\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recKybP5iHFftkyUw\",\"fields\":{\"name\":\"\\nAnn Kolb\",\"age\":\" 78\",\"location\":\" New York City\\n\\n\",\"about\":\"Leader in integrating schools\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recLNqY9X1i7bDeCJ\",\"fields\":{\"name\":\"Michael Giangrande Sr.\",\"age\":\" 78\",\"location\":\" Bellmore, N.Y.\\n\\n\",\"about\":\"\\\"Mayor of Martin Avenue\\\"\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 12\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recO6eXLuCqrBLpce\",\"fields\":{\"name\":\"\\nThomas A. Adamavich\",\"age\":\" 78\",\"location\":\" Sheboygan, Wis.\\n\\n\",\"about\":\"Especially proud of his Lithuanian heritage\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recXoVh6qUOilPwFR\",\"fields\":{\"name\":\"\\nWayne Drye\",\"age\":\" 78\",\"location\":\" Atlanta\\n\\n\",\"about\":\"Founded his own company, World Insurance Association, Inc\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 5\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recYaRbz0lVgvk82a\",\"fields\":{\"name\":\"\\nHarold Reisner\",\"age\":\" 78\",\"location\":\" Pittsburgh\\n\\n\",\"about\":\"Took furniture repair to the level of an art form\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec4gy6J6NBAki3Zt\",\"fields\":{\"name\":\"\\nGene Zahas\",\"age\":\" 78\",\"location\":\" Oakland, Calif.\\n\\n\",\"about\":\"Fierce advocate for educational opportunity\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec4FY3GeQghj4Z9a\",\"fields\":{\"name\":\"Stanley Chera\",\"age\":\" 78\",\"location\":\"Location unknown\",\"about\":\" second from right, was a real estate developer and property owner who started out in New York’s outer boroughs and moved onto the big stage of Manhattan. He was the first person to die from covid-19 who President Trump publicly named as a friend. A leading figure in New York’s Syrian Jewish community, Chera owned large swaths of retail space on Fifth Avenue, gave many millions to charities and was an early and generous supporter of Trump’s presidential run.\",\"source\":\"https://www.washingtonpost.com/nation/2020/04/12/first-nyc-schools-staffer-die-with-covid-19-was-so-much-more-than-principal-her-students/\",\"date\":\"April 12, 2020 at 10:55 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec6mdE6l5iE1w1wY\",\"fields\":{\"name\":\"\\nRandolph Warren Whipple\",\"age\":\" 78\",\"location\":\" Plainville, Conn.\\n\\n\",\"about\":\"Veteran of the Vietnam War\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 10\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recbPmHpvatXggKvX\",\"fields\":{\"name\":\"\\nJohn F. Von Sternberg Jr.\",\"age\":\" 79\",\"location\":\" Mountain Lakes, N.J.\\n\\n\",\"about\":\"Member of the Old Coots on Scoots motorcycle club\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recdyroRYkG28MJ5b\",\"fields\":{\"name\":\"\\nHarley E. Acker\",\"age\":\" 79\",\"location\":\" Troupsburg, N.Y.\\n\\n\",\"about\":\"Discovered his true calling when he started driving a school bus\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 10\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recfVhRAHLRNJhD6S\",\"fields\":{\"name\":\"\\nDeloris C. Traver\",\"age\":\" 79\",\"location\":\" Poughkeepsie, N.Y.\\n\\n\",\"about\":\"Entered real estate in 1995 as a second career\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 5\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reck0pVolPkmTIBxq\",\"fields\":{\"name\":\"\\nTeresa A. Olbrich\",\"age\":\" 79\",\"location\":\" Rockford, Ill.\\n\\n\",\"about\":\"Enjoyed antiquing with her daughter\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reckwC34UPdrLmmhz\",\"fields\":{\"name\":\"\\nMichael Armstrong\",\"age\":\" 79\",\"location\":\" New York City\\n\\n\",\"about\":\"Onetime publisher of the newspaper The Phoenix\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recmgjqSAh9rgHLaP\",\"fields\":{\"name\":\"Nathel Burtley\",\"age\":\" 79\",\"location\":\"Location unknown\",\"about\":\" was the first black superintendent of Flint, Mich. Family and friends said Burtley was determined to improve the experience of minority students, using the lessons he learned while growing up in a segregated Illinois city to fuel his work in Michigan.\",\"source\":\"https://developers.facebook.com/gilandpatbaileyshow/posts/701110123285624\",\"date\":\"no date\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recq1Rx1X4s6ICYKT\",\"fields\":{\"name\":\"\\nDoris Brown\",\"age\":\" 79\",\"location\":\" Gary, Ind.\\n\\n\",\"about\":\"Died on the same day as her husband\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 9\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recsrHQVxjXRGDfeD\",\"fields\":{\"name\":\"\\nAlice Glazer\",\"age\":\" 79\",\"location\":\" Silver Spring, Md.\\n\\n\",\"about\":\"Cherished mother\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 8\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recxa2bOm30lLFMaG\",\"fields\":{\"name\":\"\\nMinette Goff Cooper\",\"age\":\" 79\",\"location\":\" Louisiana\\n\\n\",\"about\":\"Loved big and told people she loved them all the time\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 28\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recxX5mrwls49xcJl\",\"fields\":{\"name\":\"\\nJanice L. McNelly\",\"age\":\" 79\",\"location\":\" Iowa\\n\\n\",\"about\":\"Served as the Iowa president of the League of Women Voters\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 8\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recyfc9h4Fy1GRiQa\",\"fields\":{\"name\":\"\\nPaul Shelden\",\"age\":\" 79\",\"location\":\" Hewlett, N.Y.\\n\\n\",\"about\":\"Clarinetist who wanted music to be easily accessible\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 17\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reczdKOHiRLya6pcz\",\"fields\":{\"name\":\"\\nMichael L. Trombley\",\"age\":\" 79\",\"location\":\" West Brattleboro, Vt.\\n\\n\",\"about\":\"Highly respected by those who worked with him\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 28\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recPLlRjRWBYXnuM8\",\"fields\":{\"name\":\"\\nKaren Kay Bentley\",\"age\":\" 79\",\"location\":\" Sturgeon Bay, Wis.\\n\\n\",\"about\":\"Avid reader and knitter\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recQzMSBK4CT3z9PT\",\"fields\":{\"name\":\"\\nDean Leroy Drake\",\"age\":\" 79\",\"location\":\" Chandler, Ariz.\\n\\n\",\"about\":\"Visited many countries\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recVfsmLjSUNZZivO\",\"fields\":{\"name\":\"\\nPatricia H. Thatcher\",\"age\":\" 79\",\"location\":\" Clifton Park, N.Y.\\n\\n\",\"about\":\"Sang in her church choir for 42 years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 5\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recWtYFkY4M1GOIvd\",\"fields\":{\"name\":\"\\nEdmon C. Carmichael\",\"age\":\" 79\",\"location\":\" Detroit\\n\\n\",\"about\":\"Pillar in the Detroit community\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 13\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec8FglarrBvTT7rm\",\"fields\":{\"name\":\"\\nJeanne Madden Cibroski\",\"age\":\" 79\",\"location\":\" Cape Cod, Mass.\\n\\n\",\"about\":\"Loved being quiet at the beach\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 5\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recARJOjsB3bLfcsB\",\"fields\":{\"name\":\"Paul A. Hamel\",\"age\":\" 80\",\"location\":\" Westminster, Mass.\\n\\n\",\"about\":\"Served with the U.S. Marines during the Vietnam War.\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 14\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recCZR84GYVFzhsCn\",\"fields\":{\"name\":\"\\nThomas I. Atwood\",\"age\":\" 80\",\"location\":\" Bluffton, S.C.\\n\\n\",\"about\":\"Co-owned and operated Atwood Television and Radio Service\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 19\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recEq02pWQlhsT8Ic\",\"fields\":{\"name\":\"Irene Ann Allen\",\"age\":\" 80\",\"location\":\" Simsbury, Conn.\\n\\n\",\"about\":\"Selected by the F.B.I. as a top recruit.\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recFtZXCOcPVlKcuZ\",\"fields\":{\"name\":\"\\nDiana G. DeVito Swist\",\"age\":\" 80\",\"location\":\" Norwalk, Conn.\\n\\n\",\"about\":\"Filled her life by caring for her children and grandchildren\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 13\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recac0qBRYz0effsW\",\"fields\":{\"name\":\"\\nCarol A. Castle\",\"age\":\" 80\",\"location\":\" Weymouth, Mass.\\n\\n\",\"about\":\"Enjoyed the church’s women’s bowling league\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 23\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"receajC1ofuyVH09U\",\"fields\":{\"name\":\"\\nLucille Dolores Romer\",\"age\":\" 80\",\"location\":\" New Jersey\\n\\n\",\"about\":\"Enjoyed gardening, decorating and cooking\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 23\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recmmO0nOO9WjnMTn\",\"fields\":{\"name\":\"\\nMary Elizabeth Parr\",\"age\":\" 80\",\"location\":\" Connecticut\\n\\n\",\"about\":\"Teacher and reading specialist\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 2\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recq5VhEEeZR8E5RC\",\"fields\":{\"name\":\"\\nSteve Dalkowski\",\"age\":\" 80\",\"location\":\" New Britain, Conn.\\n\\n\",\"about\":\"Gifted pitcher who never made the big leagues\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 19\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recsSLDX0KODkrkdO\",\"fields\":{\"name\":\"Melvin Pumphrey\",\"age\":\" 80\",\"location\":\" Chicago Heights, Ill.\\n\\n\",\"about\":\"Relished his role as a mentor\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recurssDNZzF2U0cc\",\"fields\":{\"name\":\"\\nJohn Joseph Christiana Jr.\",\"age\":\" 80\",\"location\":\" Hartford, Conn.\\n\\n\",\"about\":\"Master electrician\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 19\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recyLswpeWnGTPz0k\",\"fields\":{\"name\":\"\\nJudy Therrian\",\"age\":\" 80\",\"location\":\" Ellenton, Fla.\\n\\n\",\"about\":\"Wife who outlived her husband by less than two days\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 20\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recLNV8SufJQlW3s3\",\"fields\":{\"name\":\"\\nRonald Boccacio\",\"age\":\" 80\",\"location\":\" Hartford, Conn.\\n\\n\",\"about\":\"Enjoyed dancing, shooting pool and going to Soundview Beach\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 24\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recLl19WkAeF4wb5z\",\"fields\":{\"name\":\"\\nCarol Davis\",\"age\":\" 80\",\"location\":\" Manatee County, Fla.\\n\\n\",\"about\":\"Alabama native who led travel agencies in Florida\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 14\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recMgil85DyOiwAKr\",\"fields\":{\"name\":\"\\nMary Ellen Houle\",\"age\":\" 80\",\"location\":\" Bedford, N.H.\\n\\n\",\"about\":\"Amazing in every sense of the word\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 5\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recMFylJcfCNBFujg\",\"fields\":{\"name\":\"\\nMarcia Rushford\",\"age\":\" 80\",\"location\":\" Alexandria, Va.\\n\\n\",\"about\":\"Will be remembered for her spirit of adventure and wanderlust\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 23\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recP5yoNdw5v9qLt2\",\"fields\":{\"name\":\"\\nPatricia McGowan\",\"age\":\" 80\",\"location\":\" New York City\\n\\n\",\"about\":\"Dispensed tough but empathetic love to her students\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 19\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recPI5YKBJ3dkUL0f\",\"fields\":{\"name\":\"\\nJohn Robert Oglesbee\",\"age\":\" 80\",\"location\":\" Tahlequah, Okla.\\n\\n\",\"about\":\"Had a vision to provide sophisticated medical care to rural areas\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 26\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recS6LR6oPjPIE4u4\",\"fields\":{\"name\":\"\\nOwen Moreland Parks\",\"age\":\" 80\",\"location\":\" Milford, Del.\\n\\n\",\"about\":\"Represented Delaware in senior bowling tournaments\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 16\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recT5jlK4bmjoD0CR\",\"fields\":{\"name\":\"\\nDaniel S. Pincu\",\"age\":\" 80\",\"location\":\" Asheville, N.C.\\n\\n\",\"about\":\"Army veteran, business owner, free spirit and kvetch\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recTCdmrj4bKb5SjN\",\"fields\":{\"name\":\"\\nNorman Walker Jr.\",\"age\":\" 80\",\"location\":\" China Township, Mich.\\n\\n\",\"about\":\"Shared his produce with food pantries and his neighbors\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recYjs2mXIk6esIQq\",\"fields\":{\"name\":\"\\nPaul Nathan Fontenot\",\"age\":\" 80\",\"location\":\" Lafayette, La.\\n\\n\",\"about\":\"Professional land surveyor and civil engineer\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 28\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recYEr6H2qZqlwQgy\",\"fields\":{\"name\":\"\\nLinda L. Orendorff\",\"age\":\" 80\",\"location\":\" Hilliard, Ohio\\n\\n\",\"about\":\"Her strength was a thing of wonder\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 20\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recYIdd7cSD39aiwl\",\"fields\":{\"name\":\"Steve Dalkowski\",\"age\":\" 80\",\"location\":\"Location unknown\",\"about\":\" pitched nine years in the minor leagues in the 1950s and ’60s, mostly in the Baltimore Orioles organization, without reaching the major leagues. Yet he is remembered as perhaps the game’s greatest unharnessed talent, the hardest-throwing pitcher in history with a fastball as uncontrollable as it was unhittable.\",\"source\":\"https://www.washingtonpost.com/dc-md-va/2020/04/27/pastor-landon-spradlin-coronavirus-death/\",\"date\":\"April 27, 2020 at 7:00 AM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec1mHGl7YcIStLgB\",\"fields\":{\"name\":\"\\nBette Jones\",\"age\":\" 80\",\"location\":\" Farmington, Conn.\\n\\n\",\"about\":\"Collector of people, laughter and good stories\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec2KS0GEqZXp2ZF6\",\"fields\":{\"name\":\"\\nEric F. Anderson\",\"age\":\" 80\",\"location\":\" Southfield, Mich.\\n\\n\",\"about\":\"Worked as a computer specialist for the Department of Agriculture\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 21\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recAzZODZcPvFXKwW\",\"fields\":{\"name\":\"\\nJulia Maye Alexander\",\"age\":\" 81\",\"location\":\" Upland, Calif.\\n\\n\",\"about\":\"Taught math, English and history for over 30 years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 2\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recBokcqpAlbLRBB7\",\"fields\":{\"name\":\"\\nConrad Ifill\",\"age\":\" 81\",\"location\":\" Hempstead, N.Y.\\n\\n\",\"about\":\"Bakery owner attuned to the West Indies\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 17\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recCt4gmfzOUBTex0\",\"fields\":{\"name\":\"\\nPio Mactal Vilar Jr.\",\"age\":\" 81\",\"location\":\" Summerlin, Nev.\\n\\n\",\"about\":\"Emigrated to the United States in 1963 as a medical resident\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 12\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recas9DSDdWt4ULL3\",\"fields\":{\"name\":\"Terrence McNally\",\"age\":\" 81\",\"location\":\"Location unknown\",\"about\":\" was a prolific, much-honored playwright who rose to the forefront of American theater with a humane and lyrical style in works such as \\\"Love! Valour! Compassion!\\\" and \\\"Master Class.\\\" McNally was a pivotal American dramatist, particularly as art and politics collided during the AIDS crisis in the 1980s and 1990s.\",\"source\":\"https://www.washingtonpost.com/local/obituaries/ellis-marsalis-pianist-and-patriarch-of-jazz-dynasty-dies-of-coronavirus-at-85/2020/04/02/4c5cc48c-74e6-11ea-a9bd-9f8b593300d0_story.html\",\"date\":\"April 2, 2020 at 7:06 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recdCOajd8qedcUwk\",\"fields\":{\"name\":\"\\nAlice Louise Trout\",\"age\":\" 81\",\"location\":\" Pendleton, Ind.\\n\\n\",\"about\":\"Church choir director, soloist and organist\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recedcp1LDjK3uIrH\",\"fields\":{\"name\":\"\\nRegina D. Cullen\",\"age\":\" 81\",\"location\":\" Shrewsbury, Mass.\\n\\n\",\"about\":\"Small in stature but strong in spirit\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 31\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"receMHHIx6NyZE1w3\",\"fields\":{\"name\":\"\\nTerrence McNally\",\"age\":\" 81\",\"location\":\" Sarasota, Fla.\\n\\n\",\"about\":\"Tony-winning playwright of gay life\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 24\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recfPFrUE2tUDzdGe\",\"fields\":{\"name\":\"\\nFrances M. Pilot\",\"age\":\" 81\",\"location\":\" Wall, N.J.\\n\\n\",\"about\":\"Known as Big Momma to all who loved her\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 9\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recjB2fQmKmCW6N3E\",\"fields\":{\"name\":\"\\nRonald Wilfred LePage\",\"age\":\" 81\",\"location\":\" Grand Rapids, Mich.\\n\\n\",\"about\":\"His ever-morphing and repetitive stories will be missed\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 16\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recp9BodmB8BTo38k\",\"fields\":{\"name\":\"\\nArlola Rawls\",\"age\":\" 81\",\"location\":\" Chicago\\n\\n\",\"about\":\"Caretaker of her neighborhood\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 10\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recsNeTorRVKmhtXW\",\"fields\":{\"name\":\"Clifford J. Williams\",\"age\":\" 81\",\"location\":\" Schaghticoke, N.Y.\\n\\n\",\"about\":\"Member for over 46 years of the Operating Engineers Union, Local No. 106.\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rectH1E2ZBA0fZdjs\",\"fields\":{\"name\":\"\\nRonald Jacobus\",\"age\":\" 81\",\"location\":\" Galloway, N.J.\\n\\n\",\"about\":\"Master storyteller, with a quick wit and a flair for the dramatic\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recwN0SQprHrJ5hPn\",\"fields\":{\"name\":\"\\nJohn Pfahl\",\"age\":\" 81\",\"location\":\" Buffalo\\n\\n\",\"about\":\"Inventive landscape photographer\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 15\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recwDQGqU2c9NoI6l\",\"fields\":{\"name\":\"\\nLawrence Littig\",\"age\":\" 81\",\"location\":\" Norwalk, Conn.\\n\\n\",\"about\":\"A long career in finance\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recLW8r2rU3PizqrT\",\"fields\":{\"name\":\"\\nYvonne S. Orlando\",\"age\":\" 81\",\"location\":\" Bethlehem, Pa.\\n\\n\",\"about\":\"Enjoyed novels, crossword puzzles, art and TV shows\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 28\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recLm608e8bJzjwjL\",\"fields\":{\"name\":\"Alan Lund\",\"age\":\" 81\",\"location\":\" Washington\\n\\n\",\"about\":\"Conductor with \\\"the most amazing ear\\\"\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 19\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recMzmZAIEf7cLQpy\",\"fields\":{\"name\":\"\\nCarl Gunther Reiss\",\"age\":\" 81\",\"location\":\" Winston-Salem, N.C.\\n\\n\",\"about\":\"His passion for learning was insatiable\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recNiI5131MvTl8J9\",\"fields\":{\"name\":\"\\nPeter J. Brancazio\",\"age\":\" 81\",\"location\":\" Manhasset, N.Y.\\n\\n\",\"about\":\"Scientist who explained the physics of sports\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 25\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recOgqyTJJysvDs9E\",\"fields\":{\"name\":\"\\nMarvin L. Thomas\",\"age\":\" 81\",\"location\":\" Sun Lakes, Ariz.\\n\\n\",\"about\":\"A million dollar-smile\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 13\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recP6MnHrimwgkwUg\",\"fields\":{\"name\":\"\\nDale A. Boston\",\"age\":\" 81\",\"location\":\" Massachusetts\\n\\n\",\"about\":\"Co-owner of Johnnies Sandwich Shop\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recRxb3jyvcr6hRFc\",\"fields\":{\"name\":\"\\nJoseph Migliucci\",\"age\":\" 81\",\"location\":\" White Plains, N.Y.\\n\\n\",\"about\":\"Fourth-generation owner of Mario’s restaurant, a Bronx institution\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 6\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recTkJheHN1R30RyK\",\"fields\":{\"name\":\"\\nJohn Pearson Brucher\",\"age\":\" 81\",\"location\":\" Cedar Rapids, Iowa\\n\\n\",\"about\":\"Retired from H&W Motor Express after 30 years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 28\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recTJa2oqhMOAzqVh\",\"fields\":{\"name\":\"\\nBobby Joseph Hebert\",\"age\":\" 81\",\"location\":\" Cut Off, La.\\n\\n\",\"about\":\"A 33-year career with the Louisiana Department of Transportation\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 28\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recZ1FnK3o6McwHXf\",\"fields\":{\"name\":\"Andrea Ruth Ludgin\",\"age\":\" 81\",\"location\":\" Oyster Bay, N.Y.\\n\\n\",\"about\":\"Winner of the art prize at Mt. Holyoke.\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 17\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec3gXyAyosmy6O3d\",\"fields\":{\"name\":\"\\nWilfred Jay Sikkema\",\"age\":\" 81\",\"location\":\" Clinton, Iowa\\n\\n\",\"about\":\"Held many jobs throughout the years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 9\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec5bEpC4BuMUqBEg\",\"fields\":{\"name\":\"\\nJoseph F. Kelly\",\"age\":\" 81\",\"location\":\" New York City\\n\\n\",\"about\":\"Did two tours through the Panama Canal to Antarctica\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec5ZV0l2CdKQunXX\",\"fields\":{\"name\":\"\\nJoan M. Cargill\",\"age\":\" 81\",\"location\":\" New Brunswick, N.J.\\n\\n\",\"about\":\"Loved art, music and animals\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 24\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec7Fw19YljuDOCjc\",\"fields\":{\"name\":\"\\nBetty Sue Harber Carney\",\"age\":\" 81\",\"location\":\" Grapevine, Texas\\n\\n\",\"about\":\"Beloved mother, grandmother, great-grandmother and great-great-grandmother\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 1\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recAOSepDZWk53rhK\",\"fields\":{\"name\":\"\\nAlbert K. Webster\",\"age\":\" 82\",\"location\":\" New York City\\n\\n\",\"about\":\"Executive behind New York Philharmonic’s economic growth\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recAPLVckrwTIJOKD\",\"fields\":{\"name\":\"David Reissig\",\"age\":\" 82\",\"location\":\" Vermont\\n\\n\",\"about\":\"Retired from the U.S. Customs Agency after 28 years.\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"March 30\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recAnRwOPVH6AsFW9\",\"fields\":{\"name\":\"\\nDouglas H. Diamond\",\"age\":\" 82\",\"location\":\" Chelmsford, Mass.\\n\\n\",\"about\":\"Involved with the development of Air Force technologies\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recBTtK3neTj13mRU\",\"fields\":{\"name\":\"\\nDeane K. Felter\",\"age\":\" 82\",\"location\":\" Cromwell, Conn.\\n\\n\",\"about\":\"Played for the New York Giants as a halfback\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recIZ26Ttx4XC6yPb\",\"fields\":{\"name\":\"\\nCelestino Padilla Sr.\",\"age\":\" 82\",\"location\":\" Rochester, N.Y.\\n\\n\",\"about\":\"Enjoyed gardening, fishing, hunting, playing pranks and spending time with family\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 22\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recadEGvuusHg16QE\",\"fields\":{\"name\":\"\\nRobert Barnes\",\"age\":\" 82\",\"location\":\" Philadelphia\\n\\n\",\"about\":\"Widely respected tenor saxophone player\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 22\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recc3yPiTquY8SVM9\",\"fields\":{\"name\":\"\\nCharles Dow Long\",\"age\":\" 82\",\"location\":\" Tempe, Ariz.\\n\\n\",\"about\":\"Taught himself to play the drums\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 20\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"receOhIXcyWtmOYdq\",\"fields\":{\"name\":\"\\nMari Jo Davitto\",\"age\":\" 82\",\"location\":\" Thornton, Ill.\\n\\n\",\"about\":\"People were her hobby\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 7\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recgEOj6CxUGBGB64\",\"fields\":{\"name\":\"\\nLester Eber\",\"age\":\" 82\",\"location\":\" New York\\n\\n\",\"about\":\"Worked for over six decades in the wine and liquor industry\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 5\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"reckhuJVtCQvpXl8o\",\"fields\":{\"name\":\"\\nTimothy E. Murray\",\"age\":\" 82\",\"location\":\" Ocean View, Del.\\n\\n\",\"about\":\"Retired from Verizon after over 40 years of service\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 12\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recqxGo1ptBocLJl7\",\"fields\":{\"name\":\"\\nJean M. Winterbottom\",\"age\":\" 82\",\"location\":\" Farmington Hills, Mich.\\n\\n\",\"about\":\"Certified horticulturist\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 5\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recuR3wTk60cLg4bV\",\"fields\":{\"name\":\"\\nMercedes Santiago\",\"age\":\" 82\",\"location\":\" Lawrence, Mass.\\n\\n\",\"about\":\"Owned one of the first Spanish bodegas in the city of Lawrence\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 29\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recxLzqTg1aiLIdHp\",\"fields\":{\"name\":\"\\nJames Merle Weaver\",\"age\":\" 82\",\"location\":\" New York\\n\\n\",\"about\":\"Smithsonian music curator\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 16\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recKHAW53nJs1OZqL\",\"fields\":{\"name\":\"\\nJane Krumrine\",\"age\":\" 82\",\"location\":\" Merion Station, Pa.\\n\\n\",\"about\":\"Vice president at an insurance firm\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 17\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recKHWIamoIss9Dqw\",\"fields\":{\"name\":\"\\nDennis Peters\",\"age\":\" 82\",\"location\":\" Indiana\\n\\n\",\"about\":\"Roaring voice that filled lecture halls\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 20\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recTYkEIhiiArI0hh\",\"fields\":{\"name\":\"John Horton Conway\",\"age\":\" 82\",\"location\":\" New Brunswick, N.J.\\n\\n\",\"about\":\"Mathematician known as the \\\"magical genius\\\"\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 11\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recWQ4i9RGeaRVsC2\",\"fields\":{\"name\":\"\\nAnna M. Gayton\",\"age\":\" 82\",\"location\":\" Peabody, Mass.\\n\\n\",\"about\":\"Remembered for the \\\"nana blankets\\\" she made for her newborn grandchildren\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"May 4\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recYZSe9PZrhEE3lN\",\"fields\":{\"name\":\"Tommie Brown\",\"age\":\" 82\",\"location\":\"Location unknown\",\"about\":\" and Doris Brown, 79, of Gary, Ind., were inseparable for nearly 62 years. Relatives say their union was marked by a solemn vow: They would always be with each other, no matter what. On April 9, they fulfilled that promise, dying on the same day despite battling coronavirus in separate hospitals.\",\"source\":\"https://www.washingtonpost.com/local/passionate-about-making-sure-people-had-care-sean-boynes-kept-going-to-work/2020/04/23/302fc266-856a-11ea-878a-86477a724bdb_story.html\",\"date\":\"April 23, 2020 at 6:30 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recYoPu605xwsHjvr\",\"fields\":{\"name\":\"\\nPeter Bainum\",\"age\":\" 82\",\"location\":\" Bethesda, Md.\\n\\n\",\"about\":\"Former aerospace engineering professor at Howard University\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 3\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec3Ey613bYDCSJ16\",\"fields\":{\"name\":\"\\nCharles Goodstein\",\"age\":\" 82\",\"location\":\" Tenafly, N.J.\\n\\n\",\"about\":\"Professor at New York University Medical School\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 30\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec4euUUyEcwoNlLI\",\"fields\":{\"name\":\"\\nElizabeth Tevenan\",\"age\":\" 82\",\"location\":\" Brewster, Mass.\\n\\n\",\"about\":\"Social butterfly\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 24\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec4Mo3111KA6TWz8\",\"fields\":{\"name\":\"\\nMary Frances Parsels Dennis\",\"age\":\" 82\",\"location\":\" Mechanicsville, Va.\\n\\n\",\"about\":\"Member of the Bell retirees\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 26\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec8MnLJnm7ctt3Vb\",\"fields\":{\"name\":\"Peter Bainum\",\"age\":\" 82\",\"location\":\"Location unknown\",\"about\":\" was an aerospace engineer who taught graduate students at Howard University for more than 30 years, ushering generations of new scientists into careers at NASA and in private industry. He got his start in engineering just as the space race was heating up and became a star in his field, speaking at aerospace symposiums around the world and winning dozens of awards for professional achievements.\",\"source\":\"https://www.washingtonpost.com/local/horace-was-the-vivacious-one-vi-kept-him-grounded-after-nearly-75-years-of-marriage-covid-19-claimed-them-days-apart/2020/04/29/c60198d4-87a7-11ea-8ac1-bfb250876b7a_story.html?hpid=hp_local1-8-12_horace-1250p%3Ahomepage%2Fstory-ans&itid=hp_local1-8-12_horace-1250p%3Ahomepage%2Fstory-ans\",\"date\":\"April 29, 2020 at 6:30 PM EDT\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"rec8RwjSST0eZxR5N\",\"fields\":{\"name\":\"\\nTommie Brown\",\"age\":\" 82\",\"location\":\" Gary, Ind.\\n\\n\",\"about\":\"Security worker who died the same day as his wife\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 9\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recAMxXmcyV3CmbJ1\",\"fields\":{\"name\":\"\\nPhil Langley\",\"age\":\" 83\",\"location\":\" Frankfort, Ill.\\n\\n\",\"about\":\"Member of Harness Racing Hall of Fame\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 11\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recAGcjtrcRciXeR0\",\"fields\":{\"name\":\"\\nAnthony J. Valdati Jr.\",\"age\":\" 83\",\"location\":\" Glastonbury, Conn.\\n\\n\",\"about\":\"Computer engineer at Pratt and Whitney for many years\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"},{\"id\":\"recCyYVQKyzRb7pPg\",\"fields\":{\"name\":\"\\nDorothy Murphy\",\"age\":\" 83\",\"location\":\" Salem, Mass.\\n\\n\",\"about\":\"Shared a special bond with both of her sons\",\"source\":\"https://www.nytimes.com/interactive/2020/05/24/us/us-coronavirus-deaths-100000.html\",\"date\":\"April 27\"},\"createdTime\":\"2020-09-27T19:29:21.000Z\"}],\"offset\":\"itrLMbQHcAIeeurHU/recCyYVQKyzRb7pPg\"}");

/***/ }),

/***/ "./resources/js/modules/search.js":
/*!****************************************!*\
  !*** ./resources/js/modules/search.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state_namesMachine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @state/namesMachine */ "./resources/js/state/namesMachine.js");

var viewMoreButton = document.getElementById('viewMore');
var searchButton = document.getElementById('searchButton');
var hasValue = false;

if (viewMoreButton) {
  var fetchMoreData = function fetchMoreData() {
    return _state_namesMachine__WEBPACK_IMPORTED_MODULE_0__["namesService"].send('FETCH');
  };

  viewMoreButton.addEventListener('click', fetchMoreData);
}

if (searchButton) {
  var searchInput = document.getElementById('search');

  var clearName = function clearName() {
    hasValue = false;
    _state_namesMachine__WEBPACK_IMPORTED_MODULE_0__["namesService"].send('INITIALIZE');
    searchInput.value = null;
    searchButton.innerText = 'Search';
  };

  var searchForName = function searchForName() {
    if (hasValue) return clearName();
    hasValue = true;
    _state_namesMachine__WEBPACK_IMPORTED_MODULE_0__["namesService"].send('FETCH', {
      query: searchInput.value
    });
    searchButton.innerText = 'Clear';
  };

  searchButton.addEventListener('click', searchForName);
}

/***/ }),

/***/ "./resources/js/modules/tooltips.js":
/*!******************************************!*\
  !*** ./resources/js/modules/tooltips.js ***!
  \******************************************/
/*! exports provided: setupToolTips */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupToolTips", function() { return setupToolTips; });
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/index.js");


var setupToolTip = function setupToolTip(id) {
  var trigger = document.getElementById("name-".concat(id));
  var tooltip = document.getElementById(id);
  var ttCloseButton = tooltip.querySelector('button');
  var popperInstance = null;

  function create() {
    popperInstance = Object(_popperjs_core__WEBPACK_IMPORTED_MODULE_0__["createPopper"])(trigger, tooltip, {
      strategy: 'fixed',
      modifiers: [{
        name: 'preventOverflow',
        options: {
          rootBoundary: 'document',
          altBoundary: true
        }
      }]
    });
  }

  function destroy() {
    if (popperInstance) {
      popperInstance.destroy();
      popperInstance = null;
    }
  }

  function show() {
    tooltip.setAttribute('data-show', '');
    create();
  }

  function hide() {
    tooltip.removeAttribute('data-show');
    destroy();
  }

  var showEvents = ['mouseenter', 'focus'];
  var hideEvents = ['mouseleave', 'blur'];
  showEvents.forEach(function (event) {
    trigger.addEventListener(event, show);
  });
  hideEvents.forEach(function (event) {
    trigger.addEventListener(event, hide);
  });
  ttCloseButton.addEventListener('click', hide);
};

var setupToolTips = function setupToolTips() {
  var toolTips = document.querySelectorAll('.tooltip');
  Array.from(toolTips).forEach(function (tip) {
    return setupToolTip(tip.id);
  });
};

/***/ }),

/***/ "./resources/js/singles/home.js":
/*!**************************************!*\
  !*** ./resources/js/singles/home.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state_namesMachine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @state/namesMachine */ "./resources/js/state/namesMachine.js");
/* harmony import */ var _state_nationalDataMachine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @state/nationalDataMachine */ "./resources/js/state/nationalDataMachine.js");
/* harmony import */ var _modules_search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @modules/search */ "./resources/js/modules/search.js");




/***/ }),

/***/ "./resources/js/state/namesMachine.js":
/*!********************************************!*\
  !*** ./resources/js/state/namesMachine.js ***!
  \********************************************/
/*! exports provided: namesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "namesService", function() { return namesService; });
/* harmony import */ var xstate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xstate */ "./node_modules/xstate/es/index.js");
/* harmony import */ var _modules_tooltips__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @modules/tooltips */ "./resources/js/modules/tooltips.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components */ "./resources/js/components.js");
/* harmony import */ var _initialData_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../initialData.json */ "./resources/js/initialData.json");
var _initialData_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../initialData.json */ "./resources/js/initialData.json", 1);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var mapRecords = function mapRecords(records) {
  return records.map(function (record) {
    return _objectSpread({
      id: record.id
    }, record.fields);
  });
};

var buildList = function buildList(records) {
  var mappedRecords = mapRecords(records);
  document.getElementById('nameList').innerHTML = Object(_components__WEBPACK_IMPORTED_MODULE_2__["nameList"])(mappedRecords);
  setTimeout(function () {
    return Object(_modules_tooltips__WEBPACK_IMPORTED_MODULE_1__["setupToolTips"])();
  }, 1000);
};

var AIR_TABLE_BASE_URL = 'https://api.airtable.com/v0/appAaEysX2qTVLYXy/covid-memorial?view=Grid%20view';

var fetchData = function fetchData(context, _ref) {
  var query = _ref.query,
      offset = _ref.offset;
  var url = AIR_TABLE_BASE_URL;

  if (query) {
    url += "&filterByFormula=SEARCH(\"".concat(query.toLowerCase(), "\",LOWER({name}))");
  } else if (offset) {
    url += "&offset=".concat(offset);
  }

  return fetch(url, {
    method: 'GET',
    headers: new Headers({
      authorization: "Bearer ".concat("key1XfRWvvHoxFxed")
    })
  }).then(function (res) {
    return res.json();
  }).then(function (res) {
    var records = query ? res.records : [].concat(_toConsumableArray(context.names), _toConsumableArray(res.records));
    buildList(records);
    return _objectSpread(_objectSpread({}, res), {}, {
      records: records
    });
  });
};

var fetchInitialData = function fetchInitialData() {
  return new Promise(function (resolve) {
    buildList(_initialData_json__WEBPACK_IMPORTED_MODULE_3__.records);
    return resolve(_initialData_json__WEBPACK_IMPORTED_MODULE_3__);
  });
};

var fetchMachine = Object(xstate__WEBPACK_IMPORTED_MODULE_0__["createMachine"])({
  id: 'NAMES',
  initial: 'idle',
  context: {
    names: [],
    offset: null
  },
  states: {
    idle: {
      on: {
        FETCH: 'loading',
        INITIALIZE: 'loadingInitial'
      }
    },
    loadingInitial: {
      invoke: {
        src: fetchInitialData,
        onDone: {
          target: 'idle',
          actions: ['setOffset', 'setResults']
        },
        onError: 'rejected'
      }
    },
    loading: {
      invoke: {
        id: 'fetchData',
        src: fetchData,
        onDone: {
          target: 'idle',
          actions: ['setOffset', 'setResults']
        },
        onError: 'rejected'
      },
      on: {
        CANCEL: 'idle'
      }
    },
    rejected: {
      on: {
        FETCH: 'loading'
      }
    }
  }
}, {
  actions: {
    setResults: Object(xstate__WEBPACK_IMPORTED_MODULE_0__["assign"])(function (_, event) {
      return {
        names: event.data.records
      };
    }),
    setOffset: Object(xstate__WEBPACK_IMPORTED_MODULE_0__["assign"])(function (_, event) {
      return {
        offset: event.data.offset
      };
    })
  }
});
var namesService = Object(xstate__WEBPACK_IMPORTED_MODULE_0__["interpret"])(fetchMachine, {
  devTools: true
}).onTransition(function (state) {
  return console.log(state.value);
}).start();
namesService.send('INITIALIZE');

/***/ }),

/***/ "./resources/js/state/nationalDataMachine.js":
/*!***************************************************!*\
  !*** ./resources/js/state/nationalDataMachine.js ***!
  \***************************************************/
/*! exports provided: nationalDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nationalDataService", function() { return nationalDataService; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var xstate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xstate */ "./node_modules/xstate/es/index.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var SUMMARY_API = 'https://api.covidtracking.com/v1/us/current.json';

function updateData(deaths) {
  var dataContainer = document.getElementById('initialCount');
  dataContainer.innerHTML = deaths.toLocaleString();
  dataContainer.classList.toggle('loaded');
}

var fetchData = function fetchData() {
  var localData = sessionStorage.getItem('nationalData');

  if (localData) {
    var parsedData = JSON.parse(localData);
    updateData(parsedData.death);
    return new Promise(function (resolve) {
      return resolve({
        data: parsedData
      });
    });
  }

  var handleFetch = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var response, data;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch(SUMMARY_API);

            case 2:
              response = _context.sent;
              _context.next = 5;
              return response.json();

            case 5:
              data = _context.sent;
              sessionStorage.setItem('nationalData', JSON.stringify(data[0]));
              updateData(data.death);
              return _context.abrupt("return", {
                data: data[0]
              });

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleFetch() {
      return _ref.apply(this, arguments);
    };
  }();

  return handleFetch();
};

var nationalDataMachine = Object(xstate__WEBPACK_IMPORTED_MODULE_1__["createMachine"])({
  id: 'NAMES',
  initial: 'idle',
  context: {
    data: null
  },
  states: {
    idle: {
      on: {
        FETCH: 'loading'
      }
    },
    loading: {
      invoke: {
        id: 'fetchData',
        src: fetchData,
        onDone: {
          target: 'resolved',
          actions: ['setData']
        },
        onError: 'rejected'
      },
      on: {
        CANCEL: 'idle'
      }
    },
    resolved: {
      type: 'final'
    },
    rejected: {
      on: {
        FETCH: 'loading'
      }
    }
  }
}, {
  actions: {
    setData: Object(xstate__WEBPACK_IMPORTED_MODULE_1__["assign"])(function (_, _ref2) {
      var data = _ref2.data;
      return data;
    })
  }
});
var nationalDataService = Object(xstate__WEBPACK_IMPORTED_MODULE_1__["interpret"])(nationalDataMachine, {
  devTools: true
}).onTransition(function (state) {
  return console.log(state);
}).start();
nationalDataService.send('FETCH');

/***/ }),

/***/ 1:
/*!********************************************!*\
  !*** multi ./resources/js/singles/home.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/roberthigdon/Documents/skeleventy/resources/js/singles/home.js */"./resources/js/singles/home.js");


/***/ })

/******/ });