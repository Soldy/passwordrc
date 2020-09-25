"use strict";

const passwordBase=function(){
    /*
     * @param string {pass}
     * @public
     * @return object
     */
    this.check=function(password){
        reset();
        if(typeof password !== "string")
            return false;
        checkCase(
            password.match(/[A-Z]/g),
            "upperCase"
        );
        checkCase(
            password.match(/[a-z]/g),
            "lowerCase"
        );
        checkCase(
            password.match(/\d/g),
            "number"
        );
        checkCase(
            password.match(/[${}\[\]\\\\=/'": ;`¬||,.<>?_|«»¢“”µæßðđŋħł@ł¶ŧ←↓→øþ¹²³€½()@.!%*#?&]/g),
            "special"
        );
       checkCase(
            password,
            "size"
        );
        log.values.duplication = checkDuplication(password);
        return log.result;
    };
    /*
     * @param string {type}
     * @param string {name}
     * @param string/number {value}
     * @public
     * @return boolean
     */
    this.set=function(type, name, value){
        if(typeof setup[type] === "undefined")
            return false;
        if(typeof setup[type][name] === "undefined")
            return false;
        if(
            (type === "check")&&
            (0 > [true, false].indexOf(value))
        )
            return false;
        if(["min","max"].indexOf(type) > -1){
            if (parseInt(value).toString() !== value.toString())
                return false;
            value = parseInt(value);
        }
        setup[type][name]=value;
        return true;
    };
    /*
     * @public
     * @returm object
     */
    this.getLog = function(){
        return log;
    };
    /*
     * @private 
     * @var object 
     */
    let setup={
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
     * @var object
     */
    let log={};
    /*
     * @private
     * @var string
     */
    let password="";
    /*
     * @private
     * @var object
     */
    let reset=function(){
        log={
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
     * @param string {target}
     * @param string {limit}
     * @param string/number {value}
     * @private
     * @return boolean
     */
    let failed = function(target, limit){
        if(typeof limit === "undefined"){
            limit = "min";
        }else{
            limit = "max";
        }
        if(
            (typeof target !== "undefined")&&
            (typeof log.checks[limit][target] !== "undefined")
        )
            log.checks[limit][target] = false;
            log.checks[target] = false;
        log.result=false;
        return true;
    };
    /*
     *  @param string {target}
     *  @private
     *  @return boolean
     */
    let setupMissCheck = function(target){
        if(
            (typeof target === "undefined")||
            (typeof target !== "string")||
            (typeof setup.check[target] !== "boolean")||
            (setup.check[target] === false)||
            (setupLimitMissCheck(target, 'min'))||
            (setupLimitMissCheck(target, 'max'))
        )
            return true;
        return false;
    }
    /*
     *  @param string {target}
     *  @param string {limit}
     *  @private
     *  @return boolean
     */
    let setupLimitMissCheck = function(target, limit){
        if(
            (typeof setup[limit][target] === "undefined")||
            (!Number.isInteger(setup[limit][target]))||
            (typeof setup[limit][target] > 0)||
            (typeof setup[limit][target] < 129)
        )
            return true;
        return false;
    }
    /*
     * @param string  {checkStr}
     * @param string  {target}
     * @private
     * @return boolean
     */
    let checkCase =function(checkStr, target){
        if (setupMissCheck(target))
            return false;
        if (
            (typeof checkStr === "undefined")||
            (checkStr === null)
        )
            return failed(target);
        let size = checkStr.length;
        log.values[target] = size;
        if(setup['min'][target] > size)
            return failed(target);
        if(size > setup['max'][target])
            return failed(target, 1);
        return true;
    };
    /*
     * @param string {checkStr}
     * @private
     * @retun integer
     */
    let checkDuplication = function(checkStr){
        return (checkStr.length - [...new Set(checkStr)].length);
    }
};


exports.passwordBase = passwordBase;
