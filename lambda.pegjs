program 
  = defs:def* _ exp:exp _ {
    return {
      type: "withdefs",
      defs: defs.reduce((all, one) => ({...all, [one.name]: one }), {}),
      exp: exp
    }
  }
  / _ exp:exp _ { return exp }

def
  = "def" _ name:name _ "=" _ func:function _ {
    return { type: "def", name: name, func: func }
  }

exp 
  = function 
  / app
  / var

function
  = lambda arg:bound "." body:exp {
    return { type: "function", arg: arg, body: body }
  }
  
app
  = "(" func:exp _ arg:exp ")" _ {
    return { type: "app", func: func, arg: arg }
  }

bound
  = name

var
  = name { return { type: "var", name: text() } }

lambda
  = "\\"
  / "λ"
  / _ "lambda" _
  
name
  = [_a-z0-9*/+-]+ { return text() }

_ "whitespace"
  = [ \t\n\r]*
