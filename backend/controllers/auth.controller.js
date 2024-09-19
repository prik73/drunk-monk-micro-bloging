const signup = async (req, res)=>{
    res.json({
        data: "reached sign-up page",
    })
};

const login = async (req, res)=>{
    res.json({
        data: "reached log-in page",
    });
}

const signout = async (req, res)=>{
    res.json({
        data: "reached sign-out page",
    });
}

export { signout, login, signup };
;
