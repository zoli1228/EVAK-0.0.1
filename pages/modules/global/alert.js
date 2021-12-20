class Alert {
    constructor([...message]) {
        function escapeHtml(unsafe) {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }
        this.background = elemCreate("div", { class: "class_alert", id: "alert_overlay" })
        this.table = elemCreate("table", {})
        this.div = elemCreate("div", {})
        for (let i = 0; i < message.length; i++) {
            if (i % 2 == 0) {
                this.tr = elemCreate("tr", { id: "message_row" + i })
                this.span = elemCreate("span", { style: "color: " + message[i + 1] }, escapeHtml(message[i]))
                this.tr.appendChild(this.span)
                this.div.appendChild(this.tr)
            }
        }
        this.tr2 = elemCreate("tr", {})
        this.button = elemCreate("button", { id: "close_alert_btn", class: "_HOVER_BORDER" }, "Bezárás")
        this.tr2.appendChild(this.button)
        this.div.appendChild(this.tr2)
        this.background.appendChild(this.div)
        this.background.animate([
            { opacity: "0" },
            { opacity: "1" }
        ], {
            duration: 200,
        })
        if (sel("#alert_overlay")) {
            sel("body").removeChild(sel("#alert_overlay"))

        }
        sel("body").appendChild(this.background)
        setEvent.click(sel("#close_alert_btn"), () => {

            this.background.animate([
                { opacity: "1" },
                { opacity: "0" }
            ], {
                duration: 201,
            })
            setTimeout(() => {
                sel("body").removeChild(sel("#alert_overlay"))

            }, 200)


        })
    }

}

class Confirm {
    constructor([...message], func) {
        function escapeHtml(unsafe) {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }
        this.background = elemCreate("div", { class: "class_alert", id: "alert_overlay" })
        this.table = elemCreate("table", {})
        this.div = elemCreate("div", {})
        for (let i = 0; i < message.length; i++) {
            if (i % 2 == 0) {
                this.tr = elemCreate("tr", { id: "message_row" + i })
                this.span = elemCreate("span", { style: "color: " + message[i + 1] }, escapeHtml(message[i]))
                this.tr.appendChild(this.span)
                this.div.appendChild(this.tr)
            }
        }
        this.tr2 = elemCreate("tr", {})
        this.cancelBtn = elemCreate("a", { href: "/", id: "cancel_confirm_btn", class: "closebtn color_blue _HOVER_border" }, "Mégsem")
        this.okBtn = elemCreate("a", { href: "/", id: "ok_confirm_btn", class: "closebtn color_red _HOVER_border" }, "Folytatás")
        this.tr2.appendChild(this.okBtn)
        this.tr2.appendChild(this.cancelBtn)
        this.div.appendChild(this.tr2)
        this.background.appendChild(this.div)
        this.background.animate([
            { opacity: "0" },
            { opacity: "1" }
        ], {
            duration: 200,
        })
        if (sel("#alert_overlay")) {
            sel("body").removeChild(sel("#alert_overlay"))

        }
        sel("body").appendChild(this.background)
        setEvent.click(sel("#cancel_confirm_btn"), () => {

            this.background.animate([
                { opacity: "1" },
                { opacity: "0" }
            ], {
                duration: 201,
            })
            setTimeout(() => {
                sel("body").removeChild(sel("#alert_overlay"))
                return;

            }, 200)


        })
        setEvent.click(sel("#ok_confirm_btn"), () => {

            this.background.animate([
                { opacity: "1" },
                { opacity: "0" }
            ], {
                duration: 201,
            })
            setTimeout(() => {
                sel("body").removeChild(sel("#alert_overlay"))
                func();
                return
            }, 200)


        })
    }

}
