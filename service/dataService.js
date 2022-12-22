
// import jsonwebtoken
const jwt=require('jsonwebtoken')


userDeatails = {
    1000: { acno: 1000, username: "anu", password: 123, balance: 0, transaction: [] },
    1001: { acno: 1001, username: "amal", password: 123, balance: 0, transaction: [] },
    1002: { acno: 1002, username: "arun", password: 123, balance: 0, transaction: [] },
    1003: { acno: 1003, username: "mega", password: 123, balance: 0, transaction: [] }

}

// register
register = (acno, uname, psw) => {

    if (acno in userDeatails) {
        
        return {
            statusCode: 401,
            status: false,
            message: "user already exist"
            

        }
    } else {
        userDeatails[acno] = { acno, username: uname, password: psw, balance: 0, transaction: [] }
        console.log(userDeatails);
        return {
            statusCode: 200,
            status: true,
            message: "registration success"

        }
    }

}


login = (acno, psw) => {
    const token=jwt.sign({currentAcno:acno},'secretkey123')
    if (acno in userDeatails) {
        if (psw == userDeatails[acno]["password"]) {

            return {
                statusCode: 200,
                status: true,
                message: "login success",
                token
            }
        } else {
            return {
                statusCode: 401,
                status: false,
                message: "incurrect password"
            }
        }
    } else {
        return {
            statusCode: 401,
            status: false,
            message: "incurrect acnumber"
        }
    }


}

deposit = (acno, password, amount) => {
    var amnt = parseInt(amount)
    if (acno in userDeatails) {
        if (password == userDeatails[acno]["password"]) {
            userDeatails[acno]["balance"] += amnt
            userDeatails[acno]['transaction'].push({ type: 'CREDIT', amount: amnt })
            return {
                statusCode: 200,
                status: true,
                message: userDeatails[acno]["balance"]

            }

        }
        else {
            return {
                statusCode: 401,
                status: false,
                message: "incurrect password"
            }
        }

    } else {
        return {
            statusCode: 401,
            status: false,
            message: "incurrect acnumber"
        }
    }

}



withdraw = (acno, password, amount) => {
    var amnt = parseInt(amount)
    if (acno in userDeatails) {
        if (password == userDeatails[acno]["password"]) {
            if (amnt <= userDeatails[acno]["balance"]) {
                userDeatails[acno]["balance"] -= amnt
                userDeatails[acno]['transaction'].push({ type: 'DEBIT', amount: amnt })

                return {
                    statusCode: 200,
                    status: true,
                    message: userDeatails[acno]["balance"]
                }

            }
            else {
                return {
                    statusCode: 401,
                    status: false,
                    message: "insufficient balance"
                }

            }
        }

        else {
            return {
                statusCode: 401,
                status: false,
                message: "incurrent password"
            }
        }
    } else {
        return {
            statusCode: 401,
            status: false,
            message: "incurrect acnumber"
        }
    }

}

gettransaction = (acno) => {
    if (acno in userDeatails){
        return {

            statusCode: 200,
            status: true,
            message:userDeatails[acno]["transaction"]
        }
    }else{
        return{
            statusCode: 401,
            status: false,
            message:"incurrect acnumber"
        }
    }
}



module.exports = {
    register,
    login,
    deposit,
    withdraw,
    gettransaction

}