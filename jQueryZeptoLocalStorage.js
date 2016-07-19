/**
 * [页面暂存JS库]
 * @Author      : Leo
 * @Create Date : 2016.07.15
 * @Last Update : 2016.07.18
 * @Warn        : 用小学水平的蹩脚英文来写的注释可能引发不适，慎读代码！
 * 
 * @param  {String}     [storageNamePerfix]         [暂存的前缀, 默认为当前URL+元素名字+@]
 * @param  {Array}      [storageEvents]             [触发暂存保存的事件]
 * @param  {Function}   [loadCallback]              [暂存加载完毕回调]
 * @param  {Function}   [saveCallback]              [暂存保存完毕回调]
 * @param  {Function}   [removeCallback]            [暂存删除完毕回调]
 * 
 * @return {Function}   [removeLocalStorage]        [全局函数，调用时会清空暂存]
 *
 */
(function(w) {
    var $ = w.$;
    $.fn.initLocalStorage = function(options) {
        var options = options || {},
            formSelector = this.selector,
            inputSelector = formSelector + ' input,' + formSelector + ' select,' + formSelector + ' textarea';

        options = $.extend({
                storageNamePerfix: (window.location.href + formSelector + '@'), // localStorage key name
                storageEvents: ['change'], // localStorage listen evens
                loadCallback: function() {}, // load localStorage success call back function
                saveCallback: function() {}, // save localStorage call back function
                removeCallback: function() {}, // remove localStorage call back function
                debug: false // debug mode
            },
            options || {});

        var loadLocalStorage = function() {
            var storageCount = 0;

            $(inputSelector).each(function() {
                var storageKey = options.storageNamePerfix + this.name,
                    storageValue = localStorage.getItem(storageKey);

                if (storageValue != undefined && storageValue != null) {
                    if (this.type == 'radio') {
                        if (this.value == storageValue) {
                            this.checked = true;
                        }
                    } else if (this.type == 'checkbox') {
                        var arr = storageValue.split(',');
                        for (var i = 0; i < arr.length; i++) {
                            if (this.value == arr[i]) {
                                $(this).attr('checked', 'checked');
                            }
                        }
                    } else {
                        $(this).val(storageValue);
                    }

                    if (options.debug) {
                        console.debug('Load localStorage [' + storageKey + ' : ' + storageValue + ']');
                    };

                    storageCount++;
                }
            });

            if (storageCount > 0) {
                options.loadCallback();
            }
        }

        var saveLocalStorage = function() {

            var _events = options.storageEvents.join(' '),
                _arr = [];

            $(inputSelector).live(_events, function() {
                if (this.value != undefined && this.value != null) {

                    var storageKey = options.storageNamePerfix + this.name;

                    if (this.type == 'checkbox') {
                        var _storageVal = localStorage.getItem(storageKey);
                        if (!_storageVal || _storageVal == '') {
                            storageValue = this.value;
                        } else {
                            if (_storageVal.indexOf(this.value) != -1) { // del
                                var _storageArr = _storageVal.split(','),
                                    _newArr = [],
                                    _index = _storageArr.indexOf(this.value);

                                for (var i = 0; i < _storageArr.length; i++) {
                                    if (i != _index) {
                                        _newArr.push(_storageArr[i]);
                                    }
                                }

                                storageValue = _newArr.join();

                            } else { // add
                                storageValue = _storageVal + ',' + this.value;
                            }
                        }
                    } else {
                        storageValue = this.value;
                    }


                    localStorage.setItem(storageKey, storageValue);

                    if (options.debug) {
                        console.debug('Save localStorage [' + storageKey + ' : ' + storageValue + ']');
                    };
                }

                options.saveCallback();
            });
        }

        var removeLocalStorage = function() {
            $(inputSelector).each(function() {
                var storageKey = options.storageNamePerfix + this.name;

                localStorage.removeItem(storageKey);

                if (options.debug) {
                    console.debug('Remove localStorage [' + storageKey + ']');
                };
            });

            options.removeCallback();
        }

        w.removeLocalStorage = removeLocalStorage;

        this.ready(function() {
            loadLocalStorage(); // when form load success then get localStorage data
            saveLocalStorage(); // add listen on the form when evens is active then update the localStorage data
        });

        return this;
    };
})(window);
