//Mon Sep 09 2024 13:57:27 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("饿了么-0元夺宝无脑参与版"),
  axios = require("axios"),
  elmSignUrl = process.env.elmSignUrl ? process.env.elmSignUrl : "http://elm.iiliil.cn/api/getXSign";
let cookiesArr = [];
process.env.elmck && (process.env.elmck.indexOf("&") > -1 ? cookiesArr = process.env.elmck.split("&") : cookiesArr.push(process.env.elmck));
!(async () => {
  if (!cookiesArr[0]) {
    $.msg("未获取到elmck变量");
    return;
  }
  $.log("【提示】开始运行饿了么0元夺宝");
  $.log("共获取到[" + cookiesArr.length + "]个账号,开始任务...");
  for (let _0x9a09e2 = 0; _0x9a09e2 < cookiesArr.length; _0x9a09e2++) {
    try {
      var _0x21de7c = cookiesToMap(cookiesArr[_0x9a09e2]);
      if (!_0x21de7c || !_0x21de7c.get("USERID")) {
        $.log("第" + (_0x9a09e2 + 1) + "账号Cookie出现异常,跳过任务");
        continue;
      }
      $.log("******开始【账号" + (_0x9a09e2 + 1) + "】" + _0x21de7c.get("USERID") + "*********");
      let _0x3d9e83 = await getDBHomepage(cookiesArr[_0x9a09e2]);
      if (_0x3d9e83 && _0x3d9e83.length > 0) {
        console.log("🎉夺宝信息获取成功,开始无脑参与任务" + _0x3d9e83.length + "个夺宝奖励");
        for (const _0x4d288d of _0x3d9e83) {
          console.log("👉开始无脑参与" + _0x4d288d.name);
          !_0x4d288d.hasParticipated ? (await getDBAward(cookiesArr[_0x9a09e2], _0x4d288d.taskSetId, _0x4d288d.popTaskId), $.log("等待5秒"), await $.wait(5000)) : console.log("🔴" + _0x4d288d.name + "已参与,跳过");
        }
      }
    } catch (_0x160cda) {
      console.log("运行异常,继续下一个:" + _0x160cda.toString());
    }
  }
})();
async function getApiElmSign(_0x4ce1e9, _0x870e0e, _0x4dfec7, _0x5941bc) {
  let _0x1c78b1 = {
    "data": _0x870e0e,
    "api": _0x4ce1e9,
    "pageId": "",
    "uid": _0x4dfec7,
    "sid": _0x5941bc,
    "deviceId": "",
    "utdid": ""
  };
  const _0x2c40b2 = await axios.post(elmSignUrl, _0x1c78b1, {
    "headers": {
      "content-type": "application/json"
    }
  });
  if (_0x2c40b2 && _0x2c40b2.data) return _0x2c40b2.data;
  return console.log("ele-sign接口异常"), null;
}
async function elmRequestByApi(_0x3405bb, _0x4d9ac4, _0x29deb9) {
  var _0x1babf8 = cookiesToMap(_0x3405bb);
  let _0x225538 = _0x1babf8.get("unb"),
    _0x36e781 = _0x1babf8.get("cookie2"),
    _0x5dedda = _0x1babf8.get("USERID");
  if (!_0x225538 || !_0x36e781) {
    console.log(_0x5dedda + "饿了么Cookie unb或sid为空");
    return;
  }
  let _0x1847fb = await getApiElmSign(_0x4d9ac4, _0x29deb9, _0x225538, _0x36e781);
  if (!_0x1847fb || !_0x1847fb["x-sign"]) {
    console.log(_0x5dedda + "饿了么sign请求失败" + _0x4d9ac4);
    return;
  }
  let _0x26364b = "https://acs.m.goofish.com/gw/" + _0x4d9ac4 + "/1.0/",
    _0x70b15e = {
      "x-sgext": encodeURIComponent(_0x1847fb["x-sgext"]),
      "x-sign": encodeURIComponent(_0x1847fb["x-sign"]),
      "x-sid": _0x36e781,
      "x-uid": _0x225538,
      "x-pv": "6.3",
      "x-features": "1051",
      "x-mini-wua": encodeURIComponent(_0x1847fb["x-mini-wua"]),
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      "x-t": _0x1847fb["x-t"],
      "x-extdata": "openappkey%3DDEFAULT_AUTH",
      "x-ttid": "1551089129819@eleme_android_10.14.3",
      "x-utdid": "",
      "x-appkey": "24895413",
      "x-devid": ""
    },
    _0x2a8465 = _0x1847fb.wua ? {
      "wua": _0x1847fb.wua,
      "data": _0x29deb9
    } : {
      "data": _0x29deb9
    };
  const _0x45a65 = await axios.post(_0x26364b, _0x2a8465, {
    "headers": _0x70b15e
  });
  if (_0x45a65 && _0x45a65.data && _0x45a65.data.data) return _0x45a65.data;
  return null;
}
function cookiesToMap(_0x1f1334) {
  let _0x1d4f6d = new Map();
  if (_0x1f1334) {
    let _0xe117d4 = _0x1f1334.split(";");
    for (let _0x33eadf of _0xe117d4) {
      if (_0x33eadf.indexOf("=") > -1) {
        let [_0x5b7537, _0x38b1dd] = _0x33eadf.split("=");
        _0x1d4f6d.set(_0x5b7537.trim(), _0x38b1dd.trim());
      }
    }
  }
  return _0x1d4f6d;
}
async function getDBHomepage(_0xd8cc85) {
  let _0x50a05b = "mtop.koubei.interactioncenter.snatch.homepage.query",
    _0x31842b = "{\"actId\":\"20230811111144939171438583\",\"bizScene\":\"duobao_external\",\"bizSource\":\"APP\",\"blockList\":\"[\\\"participants\\\",\\\"wonDetail\\\",\\\"noWonPrize\\\"]\",\"channel\":\"ELMC\",\"cpnCode\":\"TIMING_RIGHT\",\"cpnCollectionId\":\"20230811111144993902427153\",\"latitude\":\"34.803482852876186\",\"longitude\":\"113.54791592806578\",\"showStatusSet\":\"[\\\"ONLINE\\\",\\\"PREPARE\\\"]\",\"statusSet\":\"[\\\"ONLINE\\\",\\\"PREPARE\\\"]\"}",
    _0x343358 = await elmRequestByApi(_0xd8cc85, _0x50a05b, _0x31842b);
  if (!_0x343358) {
    console.log("❌夺宝信息获取失败");
    return;
  }
  if (JSON.stringify(_0x343358.ret).indexOf("SUCCESS") < 0) {
    console.log("❌夺宝信息获取失败," + JSON.stringify(resultStr.ret));
    return;
  }
  let _0x17c814 = _0x343358?.["data"]?.["data"]?.["groupSnatchList"]?.["EXCELLENT"];
  if (_0x17c814 && _0x17c814.length > 0) {
    let _0x439cb0 = _0x17c814.filter(_0x5f1564 => _0x5f1564.status && _0x5f1564.status.indexOf("ONLINE") > -1).map(_0x516c12 => {
      return {
        "taskSetId": _0x516c12.properties.taskSetId,
        "popTaskId": _0x516c12.properties.popTaskId,
        "hasParticipated": _0x516c12.properties.hasParticipated,
        "name": _0x516c12.baseInfo.title
      };
    });
    return _0x439cb0;
  }
  return null;
}
async function getDBAward(_0x22aab8, _0x20fac4, _0xd82060) {
  let _0x5c3fb9 = "mtop.ele.biz.growth.task.core.receiveprize",
    _0x2539f4 = "{\"accountPlan\":\"HAVANA_COMMON\",\"bizScene\":\"duobao_external\",\"count\":\"1\",\"hsf\":\"1\",\"locationInfos\":\"[\\\"{\\\\\\\"lng\\\\\\\":113.54791592806578,\\\\\\\"lat\\\\\\\":34.803482852876186}\\\"]\",\"missionCollectionId\":\"" + _0x20fac4 + "\",\"missionId\":\"" + _0xd82060 + "\"}",
    _0x268720 = await elmRequestByApi(_0x22aab8, _0x5c3fb9, _0x2539f4);
  if (!_0x268720) {
    console.log("❌夺宝参与失败");
    return;
  }
  if (JSON.stringify(_0x268720.ret).indexOf("SUCCESS") < 0) {
    console.log("❌夺宝参与失败:" + JSON.stringify(_0x268720.ret));
    return;
  }
  return console.log("✅夺宝奖励参与成功"), null;
}
function Env(_0x5152ab, _0x2e2313) {
  class _0x130184 {
    constructor(_0x2cd7d0) {
      this.env = _0x2cd7d0;
    }
    ["send"](_0x12f62d, _0x1583eb = "GET") {
      _0x12f62d = "string" == typeof _0x12f62d ? {
        "url": _0x12f62d
      } : _0x12f62d;
      let _0x5980b6 = this.get;
      return "POST" === _0x1583eb && (_0x5980b6 = this.post), new Promise((_0x2daebf, _0x5b2cf0) => {
        _0x5980b6.call(this, _0x12f62d, (_0x33d044, _0x2166a6, _0x3f6f85) => {
          _0x33d044 ? _0x5b2cf0(_0x33d044) : _0x2daebf(_0x2166a6);
        });
      });
    }
    ["get"](_0x4f52ac) {
      return this.send.call(this.env, _0x4f52ac);
    }
    ["post"](_0x59c1a6) {
      return this.send.call(this.env, _0x59c1a6, "POST");
    }
  }
  return new class {
    constructor(_0x103cbf, _0x2f14a) {
      this.name = _0x103cbf;
      this.http = new _0x130184(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, _0x2f14a);
      this.log("", "🔔" + this.name + ", 开始!");
    }
    ["isNode"]() {
      return "undefined" != typeof module && !!module.exports;
    }
    ["isQuanX"]() {
      return "undefined" != typeof $task;
    }
    ["isSurge"]() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    ["isLoon"]() {
      return "undefined" != typeof $loon;
    }
    ["toObj"](_0x4e76a3, _0x42eb67 = null) {
      try {
        return JSON.parse(_0x4e76a3);
      } catch {
        return _0x42eb67;
      }
    }
    ["toStr"](_0x381d26, _0x233b84 = null) {
      try {
        return JSON.stringify(_0x381d26);
      } catch {
        return _0x233b84;
      }
    }
    ["getjson"](_0x1e8526, _0x393c3e) {
      let _0x22706d = _0x393c3e;
      const _0xcf51b4 = this.getdata(_0x1e8526);
      if (_0xcf51b4) try {
        _0x22706d = JSON.parse(this.getdata(_0x1e8526));
      } catch {}
      return _0x22706d;
    }
    ["setjson"](_0x251de6, _0x13f96f) {
      try {
        return this.setdata(JSON.stringify(_0x251de6), _0x13f96f);
      } catch {
        return !1;
      }
    }
    ["getScript"](_0x5914fe) {
      return new Promise(_0x18d058 => {
        this.get({
          "url": _0x5914fe
        }, (_0x1048d7, _0x456f4f, _0x100bec) => _0x18d058(_0x100bec));
      });
    }
    ["runScript"](_0x3b141e, _0x40b11d) {
      return new Promise(_0x479f11 => {
        let _0x1c9969 = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        _0x1c9969 = _0x1c9969 ? _0x1c9969.replace(/\n/g, "").trim() : _0x1c9969;
        let _0x2a6814 = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        _0x2a6814 = _0x2a6814 ? 1 * _0x2a6814 : 20;
        _0x2a6814 = _0x40b11d && _0x40b11d.timeout ? _0x40b11d.timeout : _0x2a6814;
        const [_0x4ca11c, _0x119edd] = _0x1c9969.split("@"),
          _0x1e8ee9 = {
            "url": "http://" + _0x119edd + "/v1/scripting/evaluate",
            "body": {
              "script_text": _0x3b141e,
              "mock_type": "cron",
              "timeout": _0x2a6814
            },
            "headers": {
              "X-Key": _0x4ca11c,
              "Accept": "*/*"
            }
          };
        this.post(_0x1e8ee9, (_0x10817d, _0x3dfcbe, _0x23dcc6) => _0x479f11(_0x23dcc6));
      }).catch(_0x5168fb => this.logErr(_0x5168fb));
    }
    ["loaddata"]() {
      if (!this.isNode()) return {};
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x603eac = this.path.resolve(this.dataFile),
          _0x27e4d5 = this.path.resolve(process.cwd(), this.dataFile),
          _0x3c160c = this.fs.existsSync(_0x603eac),
          _0xb48948 = !_0x3c160c && this.fs.existsSync(_0x27e4d5);
        if (!_0x3c160c && !_0xb48948) return {};
        {
          const _0x533506 = _0x3c160c ? _0x603eac : _0x27e4d5;
          try {
            return JSON.parse(this.fs.readFileSync(_0x533506));
          } catch (_0x223044) {
            return {};
          }
        }
      }
    }
    ["writedata"]() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x5e9297 = this.path.resolve(this.dataFile),
          _0x2dd9b4 = this.path.resolve(process.cwd(), this.dataFile),
          _0x505f48 = this.fs.existsSync(_0x5e9297),
          _0x333c61 = !_0x505f48 && this.fs.existsSync(_0x2dd9b4),
          _0x286c72 = JSON.stringify(this.data);
        _0x505f48 ? this.fs.writeFileSync(_0x5e9297, _0x286c72) : _0x333c61 ? this.fs.writeFileSync(_0x2dd9b4, _0x286c72) : this.fs.writeFileSync(_0x5e9297, _0x286c72);
      }
    }
    ["lodash_get"](_0xeae645, _0x4f839d, _0x1e293a) {
      const _0x52c36a = _0x4f839d.replace(/\[(\d+)\]/g, ".$1").split(".");
      let _0x171107 = _0xeae645;
      for (const _0x2c3110 of _0x52c36a) if (_0x171107 = Object(_0x171107)[_0x2c3110], void 0 === _0x171107) return _0x1e293a;
      return _0x171107;
    }
    ["lodash_set"](_0x44b395, _0x3462bf, _0x5e405b) {
      return Object(_0x44b395) !== _0x44b395 ? _0x44b395 : (Array.isArray(_0x3462bf) || (_0x3462bf = _0x3462bf.toString().match(/[^.[\]]+/g) || []), _0x3462bf.slice(0, -1).reduce((_0x560824, _0x1ddf08, _0x4b5ef3) => Object(_0x560824[_0x1ddf08]) === _0x560824[_0x1ddf08] ? _0x560824[_0x1ddf08] : _0x560824[_0x1ddf08] = Math.abs(_0x3462bf[_0x4b5ef3 + 1]) >> 0 == +_0x3462bf[_0x4b5ef3 + 1] ? [] : {}, _0x44b395)[_0x3462bf[_0x3462bf.length - 1]] = _0x5e405b, _0x44b395);
    }
    ["getdata"](_0x4c4004) {
      let _0x39c2c9 = this.getval(_0x4c4004);
      if (/^@/.test(_0x4c4004)) {
        const [, _0x512b4b, _0x3848a3] = /^@(.*?)\.(.*?)$/.exec(_0x4c4004),
          _0x26ec8d = _0x512b4b ? this.getval(_0x512b4b) : "";
        if (_0x26ec8d) try {
          const _0x47bc89 = JSON.parse(_0x26ec8d);
          _0x39c2c9 = _0x47bc89 ? this.lodash_get(_0x47bc89, _0x3848a3, "") : _0x39c2c9;
        } catch (_0x5312ac) {
          _0x39c2c9 = "";
        }
      }
      return _0x39c2c9;
    }
    ["setdata"](_0x1fe58b, _0x1dae52) {
      let _0x489a9f = false;
      if (/^@/.test(_0x1dae52)) {
        const [, _0x3ee6fb, _0x308fe5] = /^@(.*?)\.(.*?)$/.exec(_0x1dae52),
          _0x95b098 = this.getval(_0x3ee6fb),
          _0x433576 = _0x3ee6fb ? "null" === _0x95b098 ? null : _0x95b098 || "{}" : "{}";
        try {
          const _0x32c0c4 = JSON.parse(_0x433576);
          this.lodash_set(_0x32c0c4, _0x308fe5, _0x1fe58b);
          _0x489a9f = this.setval(JSON.stringify(_0x32c0c4), _0x3ee6fb);
        } catch (_0x5300da) {
          const _0x2b6607 = {};
          this.lodash_set(_0x2b6607, _0x308fe5, _0x1fe58b);
          _0x489a9f = this.setval(JSON.stringify(_0x2b6607), _0x3ee6fb);
        }
      } else _0x489a9f = this.setval(_0x1fe58b, _0x1dae52);
      return _0x489a9f;
    }
    ["getval"](_0x4a307b) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(_0x4a307b) : this.isQuanX() ? $prefs.valueForKey(_0x4a307b) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x4a307b]) : this.data && this.data[_0x4a307b] || null;
    }
    ["setval"](_0x2019b2, _0x1d0df1) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(_0x2019b2, _0x1d0df1) : this.isQuanX() ? $prefs.setValueForKey(_0x2019b2, _0x1d0df1) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x1d0df1] = _0x2019b2, this.writedata(), !0) : this.data && this.data[_0x1d0df1] || null;
    }
    ["initGotEnv"](_0x5703c4) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      _0x5703c4 && (_0x5703c4.headers = _0x5703c4.headers ? _0x5703c4.headers : {}, void 0 === _0x5703c4.headers.Cookie && void 0 === _0x5703c4.cookieJar && (_0x5703c4.cookieJar = this.ckjar));
    }
    ["get"](_0x2609f4, _0x226951 = () => {}) {
      _0x2609f4.headers && (delete _0x2609f4.headers["Content-Type"], delete _0x2609f4.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (_0x2609f4.headers = _0x2609f4.headers || {}, Object.assign(_0x2609f4.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(_0x2609f4, (_0x1f7330, _0x56c8df, _0x34c018) => {
        !_0x1f7330 && _0x56c8df && (_0x56c8df.body = _0x34c018, _0x56c8df.statusCode = _0x56c8df.status);
        _0x226951(_0x1f7330, _0x56c8df, _0x34c018);
      })) : this.isQuanX() ? (this.isNeedRewrite && (_0x2609f4.opts = _0x2609f4.opts || {}, Object.assign(_0x2609f4.opts, {
        "hints": !1
      })), $task.fetch(_0x2609f4).then(_0x24cc01 => {
        const {
          statusCode: _0x555a5c,
          statusCode: _0x1ca739,
          headers: _0x32664f,
          body: _0x38d25a
        } = _0x24cc01;
        _0x226951(null, {
          "status": _0x555a5c,
          "statusCode": _0x1ca739,
          "headers": _0x32664f,
          "body": _0x38d25a
        }, _0x38d25a);
      }, _0x1e3156 => _0x226951(_0x1e3156))) : this.isNode() && (this.initGotEnv(_0x2609f4), this.got(_0x2609f4).on("redirect", (_0x1dc4bb, _0x50d6a5) => {
        try {
          if (_0x1dc4bb.headers["set-cookie"]) {
            const _0x475388 = _0x1dc4bb.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            _0x475388 && this.ckjar.setCookieSync(_0x475388, null);
            _0x50d6a5.cookieJar = this.ckjar;
          }
        } catch (_0x5e05fb) {
          this.logErr(_0x5e05fb);
        }
      }).then(_0xe8e652 => {
        const {
          statusCode: _0x3c334c,
          statusCode: _0x324020,
          headers: _0x2abc2b,
          body: _0xe12fe4
        } = _0xe8e652;
        _0x226951(null, {
          "status": _0x3c334c,
          "statusCode": _0x324020,
          "headers": _0x2abc2b,
          "body": _0xe12fe4
        }, _0xe12fe4);
      }, _0x40dc53 => {
        const {
          message: _0x3a9ca8,
          response: _0x4ed837
        } = _0x40dc53;
        _0x226951(_0x3a9ca8, _0x4ed837, _0x4ed837 && _0x4ed837.body);
      }));
    }
    ["post"](_0x3a49a4, _0x4f95a0 = () => {}) {
      if (_0x3a49a4.body && _0x3a49a4.headers && !_0x3a49a4.headers["Content-Type"] && (_0x3a49a4.headers["Content-Type"] = "application/x-www-form-urlencoded"), _0x3a49a4.headers && delete _0x3a49a4.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (_0x3a49a4.headers = _0x3a49a4.headers || {}, Object.assign(_0x3a49a4.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.post(_0x3a49a4, (_0x53a8b0, _0x1a2c12, _0x47d25c) => {
        !_0x53a8b0 && _0x1a2c12 && (_0x1a2c12.body = _0x47d25c, _0x1a2c12.statusCode = _0x1a2c12.status);
        _0x4f95a0(_0x53a8b0, _0x1a2c12, _0x47d25c);
      });else {
        if (this.isQuanX()) _0x3a49a4.method = "POST", this.isNeedRewrite && (_0x3a49a4.opts = _0x3a49a4.opts || {}, Object.assign(_0x3a49a4.opts, {
          "hints": !1
        })), $task.fetch(_0x3a49a4).then(_0x5a6620 => {
          const {
            statusCode: _0x117ce5,
            statusCode: _0x2f859d,
            headers: _0x508ddb,
            body: _0x438528
          } = _0x5a6620;
          _0x4f95a0(null, {
            "status": _0x117ce5,
            "statusCode": _0x2f859d,
            "headers": _0x508ddb,
            "body": _0x438528
          }, _0x438528);
        }, _0x334f2a => _0x4f95a0(_0x334f2a));else {
          if (this.isNode()) {
            this.initGotEnv(_0x3a49a4);
            const {
              url: _0x5eccd5,
              ..._0x1fa3c6
            } = _0x3a49a4;
            this.got.post(_0x5eccd5, _0x1fa3c6).then(_0x52f474 => {
              const {
                statusCode: _0x25a09a,
                statusCode: _0x5403a9,
                headers: _0x111731,
                body: _0x49cb82
              } = _0x52f474;
              _0x4f95a0(null, {
                "status": _0x25a09a,
                "statusCode": _0x5403a9,
                "headers": _0x111731,
                "body": _0x49cb82
              }, _0x49cb82);
            }, _0x2d2d1a => {
              const {
                message: _0x4e693e,
                response: _0x293e7b
              } = _0x2d2d1a;
              _0x4f95a0(_0x4e693e, _0x293e7b, _0x293e7b && _0x293e7b.body);
            });
          }
        }
      }
    }
    ["time"](_0x35cefc, _0x305435 = null) {
      const _0x3e90cf = _0x305435 ? new Date(_0x305435) : new Date();
      let _0x437ae5 = {
        "M+": _0x3e90cf.getMonth() + 1,
        "d+": _0x3e90cf.getDate(),
        "H+": _0x3e90cf.getHours(),
        "m+": _0x3e90cf.getMinutes(),
        "s+": _0x3e90cf.getSeconds(),
        "q+": Math.floor((_0x3e90cf.getMonth() + 3) / 3),
        "S": _0x3e90cf.getMilliseconds()
      };
      /(y+)/.test(_0x35cefc) && (_0x35cefc = _0x35cefc.replace(RegExp.$1, (_0x3e90cf.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let _0x320880 in _0x437ae5) new RegExp("(" + _0x320880 + ")").test(_0x35cefc) && (_0x35cefc = _0x35cefc.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x437ae5[_0x320880] : ("00" + _0x437ae5[_0x320880]).substr(("" + _0x437ae5[_0x320880]).length)));
      return _0x35cefc;
    }
    ["msg"](_0x33c2ec = _0x5152ab, _0x11fc1d = "", _0x2c405b = "", _0x3b7c1b) {
      const _0x1ad235 = _0x31803f => {
        if (!_0x31803f) return _0x31803f;
        if ("string" == typeof _0x31803f) return this.isLoon() ? _0x31803f : this.isQuanX() ? {
          "open-url": _0x31803f
        } : this.isSurge() ? {
          "url": _0x31803f
        } : void 0;
        if ("object" == typeof _0x31803f) {
          if (this.isLoon()) {
            let _0x1c9264 = _0x31803f.openUrl || _0x31803f.url || _0x31803f["open-url"],
              _0x3c31dd = _0x31803f.mediaUrl || _0x31803f["media-url"];
            return {
              "openUrl": _0x1c9264,
              "mediaUrl": _0x3c31dd
            };
          }
          if (this.isQuanX()) {
            let _0x1d2b59 = _0x31803f["open-url"] || _0x31803f.url || _0x31803f.openUrl,
              _0x123571 = _0x31803f["media-url"] || _0x31803f.mediaUrl;
            return {
              "open-url": _0x1d2b59,
              "media-url": _0x123571
            };
          }
          if (this.isSurge()) {
            let _0x3e609f = _0x31803f.url || _0x31803f.openUrl || _0x31803f["open-url"];
            return {
              "url": _0x3e609f
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(_0x33c2ec, _0x11fc1d, _0x2c405b, _0x1ad235(_0x3b7c1b)) : this.isQuanX() && $notify(_0x33c2ec, _0x11fc1d, _0x2c405b, _0x1ad235(_0x3b7c1b))), !this.isMuteLog) {
        let _0x263dcd = ["", "==============📣系统通知📣=============="];
        _0x263dcd.push(_0x33c2ec);
        _0x11fc1d && _0x263dcd.push(_0x11fc1d);
        _0x2c405b && _0x263dcd.push(_0x2c405b);
        console.log(_0x263dcd.join("\n"));
        this.logs = this.logs.concat(_0x263dcd);
      }
    }
    ["log"](..._0x17d9a5) {
      _0x17d9a5.length > 0 && (this.logs = [...this.logs, ..._0x17d9a5]);
      console.log(_0x17d9a5.join(this.logSeparator));
    }
    ["logErr"](_0x5f31bd, _0x41b8a7) {
      const _0xe503bc = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      _0xe503bc ? this.log("", "❗️" + this.name + ", 错误!", _0x5f31bd.stack) : this.log("", "❗️" + this.name + ", 错误!", _0x5f31bd);
    }
    ["wait"](_0x8fa72a) {
      return new Promise(_0x1906d5 => setTimeout(_0x1906d5, _0x8fa72a));
    }
    ["done"](_0x55ba7d = {}) {
      const _0x5193c4 = new Date().getTime(),
        _0x136339 = (_0x5193c4 - this.startTime) / 1000;
      this.log("", "🔔" + this.name + ", 结束! 🕛 " + _0x136339 + " 秒");
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(_0x55ba7d);
    }
  }(_0x5152ab, _0x2e2313);
}