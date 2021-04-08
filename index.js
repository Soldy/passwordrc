/*
 *  @Soldy\passwordrc\2021.01.27\GPL3
 */
'use strict';

/*
 * @prototype
 */
const passwordBase=function(){
    /*
     * @param {string} pass
     * @public
     * @return {object}
     */
    this.check=function(password){
        _reset();
        if(typeof password !== 'string')
            return false;
        _checkCase(
            password.match(/[A-Z]/g),
            'upperCase'
        );
        _checkCase(
            password.match(/[a-z]/g),
            'lowerCase'
        );
        _checkCase(
            password.match(/\d/g),
            'number'
        );
        _checkCase(
            password.match(/[${}\[\]\\\\=/'": ;`¬||,.<>?_|«»¢“”µæßðđŋħł@ł¶ŧ←↓→øþ¹²³€½()@.!%*#?&]/g),
            'special'
        );
        _checkCase(
            password,
            'size'
        );
        _log.values.duplication = _checkDuplication(password);
        return _log.result;
    };
    /*
     * @param {string} type
     * @param {string}  name
     * @param {string||number} value
     * @public
     * @return {boolean}
     */
    this.set=function(type, name, value){
        if(typeof _setup[type] === 'undefined')
            return false;
        if(typeof _setup[type][name] === 'undefined')
            return false;
        if(
            (type === 'check')&&
            (0 > [true, false].indexOf(value))
        )
            return false;
        if(['min','max'].indexOf(type) > -1){
            if (parseInt(value).toString() !== value.toString())
                return false;
            value = parseInt(value);
        }
        _setup[type][name]=value;
        return true;
    };
    /*
     * @public
     * @returm {object}
     */
    this.getLog = function(){
        return _log;
    };
    /*
     * @private
     * @var {object}
     */
    let _setup={
        check:{
            upperCase:true,
            lowerCase:true,
            number:true,
            special:true,
            size:true,
        },
        min:{
            upperCase:1,
            lowerCase:1,
            number:1,
            special:1,
            size:10,
        },
        max:{
            upperCase:64,
            lowerCase:64,
            number:64,
            special:64,
            size:128,
        }
    };
    /*
     * @private
     * @var {object}
     */
    let _log={};
    /*
     * @private
     * @var {object}
     */
    const _reset=function(){
        _log={
            checks:{
                min:{
                    upperCase:true,
                    lowerCase:true,
                    number:true,
                    special:true,
                    size:true
                },
                max:{
                    upperCase:true,
                    lowerCase:true,
                    number:true,
                    special:true,
                    size:true
                },
                upperCase:true,
                lowerCase:true,
                number:true,
                special:true,
                size:true
            },
            failed:[],
            ok:[],
            result:true,
            values:{
                upperCase:0,
                lowerCase:0,
                number:0,
                special:0,
                size:0,
                duplication:0
            }
        };
    };
    /*
     * @param {string} target
     * @param {string} limit
     * @private
     * @return {boolean}
     */
    const _failed = function(target, limit){
        if(typeof limit === 'undefined'){
            limit = 'min';
        }else{
            limit = 'max';
        }
        if(
            (typeof target !== 'undefined')&&
            (typeof _log.checks[limit][target] !== 'undefined')
        )
            _log.checks[limit][target] = false;
        _log.checks[target] = false;
        _log.result=false;
        return true;
    };
    /*
     *  @param {string} target
     *  @private
     *  @return {boolean}
     */
    const _setupMissCheck = function(target){
        if(
            (typeof target === 'undefined')||
            (typeof target !== 'string')||
            (typeof _setup.check[target] !== 'boolean')||
            (_setup.check[target] === false)||
            (_setupLimitMissCheck(target, 'min'))||
            (_setupLimitMissCheck(target, 'max'))
        )
            return true;
        return false;
    };
    /*
     *  @param {string} targe
     *  @param {string} limit
     *  @private
     *  @return {boolean}
     */
    const _setupLimitMissCheck = function(target, limit){
        if(
            (typeof _setup[limit][target] === 'undefined')||
            (!Number.isInteger(_setup[limit][target]))||
            (typeof _setup[limit][target] > 0)||
            (typeof _setup[limit][target] < 129)
        )
            return true;
        return false;
    };
    /*
     * @param {string}  checkStr
     * @param {string}  target
     * @private
     * @return {boolean}
     */
    const _checkCase =function(checkStr, target){
        if (_setupMissCheck(target))
            return false;
        if (
            (typeof checkStr === 'undefined')||
            (checkStr === null)
        )
            return _failed(target);
        let size = checkStr.length;
        _log.values[target] = size;
        if(_setup['min'][target] > size)
            return _failed(target);
        if(size > _setup['max'][target])
            return _failed(target, 1);
        return true;
    };
    /*
     * @param {string} checkStr
     * @private
     * @retun {integer}
     */
    const _checkDuplication = function(checkStr){
        return (checkStr.length - [...new Set(checkStr)].length);
    };
};


exports.base = passwordBase;
