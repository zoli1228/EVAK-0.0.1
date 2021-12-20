var backBtn = sel("#backBtn")
var quoteModule = sel("#quote_module")
var quoteDetails = sel(".quote_details")
var updateContainer = sel("#update")
var closeBtn = sel(".closebtn")
var list = [];

setEvent.click(backBtn, () => { selectPage(backBtn.target) })
var fetchQuotes = () => {
    spinner.add()
    try {
        fetch("/content/quotes/list").then(
            response => response.json()
        ).then((data) => {
            let table = sel("#quotes_table > tbody")
            if (!data.length) {
                let noDataRow = elemCreate("tr", { class: `quote bg_white`, id: "no_data_row" })
                let td_noData = elemCreate("td", { colspan: "4", class: "_rightAlign" }, "Még nincs mentett árajánlata. Kattintson ide, hogy létrehozzon egyet: ")
                let td_createQuote = elemCreate("td", { colspan: "4" })
                let createQuote = elemCreate("a", { class: "btn3" }, "Árajánlat létrehozása")
                setEvent.click(createQuote, () => { selectPage("content/quotes/newquote") })
                td_createQuote.appendChild(createQuote)
                noDataRow.appendChild(td_noData)
                noDataRow.appendChild(td_createQuote)
                table.appendChild(noDataRow)
                return
            }
            data.forEach(e => {
                e.user = {
                    "fullname": "Kalányos Jóska",
                    "address": "2858 Aprajafalva 32"
                }
            });

            for (let i = 0; i < data.length; i++) {
                let entry = data[i]
                let color;
                if (table.childElementCount % 2 == 0) {
                    color = "bg_white"
                } else {
                    color = "bg_grey"
                }
                let row = elemCreate("tr", { class: `quote ${color} _HOVER_color_green`, id: "quote_" + i })
                let td_checkBox = elemCreate("td", {})
                let td_serialNo = elemCreate("td", {})
                let td_clientName = elemCreate("td", {})
                let td_createdAt = elemCreate("td", {})
                let td_expiryDate = elemCreate("td", {})
                let td_grossTotal = elemCreate("td", {})
                let td_status = elemCreate("td", {})
                let td_options = elemCreate("td", {})
                let checkBox = elemCreate("input", { type: "checkbox", class: "quote_checkbox" })
                let serialNo = elemCreate("span", { value: entry.serialnumber }, entry.serialnumber)
                let clientName = elemCreate("span", { value: entry.clientname }, entry.clientname)
                let createdAt = elemCreate("span", { value: entry.createdAt }, convertDate(entry.createdAt))
                let expiryDate = elemCreate("span", { value: entry.expiryDate }, convertDate(entry.expiryDate))
                let grossTotal = elemCreate("span", { value: entry.grossTotal }, toCurrency(entry.grossTotal))
                let status = elemCreate("span", { value: entry.status }, entry.status)
                let options = elemCreate("a", { id: "options_btn_" + i })
                td_checkBox.appendChild(checkBox)
                td_serialNo.appendChild(serialNo)
                td_clientName.appendChild(clientName)
                td_createdAt.appendChild(createdAt)
                td_expiryDate.appendChild(expiryDate)
                td_grossTotal.appendChild(grossTotal)
                td_status.appendChild(status)
                td_options.appendChild(options)
                row.appendChild(td_checkBox)
                row.appendChild(td_serialNo)
                row.appendChild(td_clientName)
                row.appendChild(td_createdAt)
                row.appendChild(td_expiryDate)
                row.appendChild(td_grossTotal)
                row.appendChild(td_status)
                row.appendChild(td_options)
                table.appendChild(row)
                let details = sel("#quoteDetails")
                setEvent.click(row, (e) => {
                    /* Details (Expanded) */
                    details.innerHTML = ""

                    /* Controls */

                    let btnContainer = elemCreate("table", { class: "navButtonContainer" })
                    let tr_btnContainer = elemCreate("tr", {})
                    let td_btnContainer = elemCreate("td", { colspan: "7" })
                    let collapseBtn = elemCreate("a", { class: "_HOVER_menubar btn4" }, "Törlés")
                    let withdrawBtn = elemCreate("a", { class: " _HOVER_menubar btn4" }, "Ajánlat visszavonása")
                    let editBtn = elemCreate("a", { class: " _HOVER_menubar btn4" }, "Szerkesztés")
                    let printBtn = elemCreate("a", { class: " _HOVER_menubar btn4" }, "Nyomtatás")
                    let sendBtn = elemCreate("a", { class: " _HOVER_menubar btn4" }, "Küldés e-mailben")
                    let closeBtn = elemCreate("a", { class: " _HOVER_menubar btn4" }, "Bezárás")
                    td_btnContainer.appendChild(collapseBtn)
                    td_btnContainer.appendChild(withdrawBtn)
                    td_btnContainer.appendChild(editBtn)
                    td_btnContainer.appendChild(printBtn)
                    td_btnContainer.appendChild(sendBtn)
                    td_btnContainer.appendChild(closeBtn)
                    tr_btnContainer.appendChild(td_btnContainer)
                    btnContainer.appendChild(tr_btnContainer)
                    details.appendChild(btnContainer)

                    setEvent.click(closeBtn, (e) => {
                        let xClickPos = e.clientX
                        let yClickPos = e.clientY
                        details.style.transformOrigin = `${xClickPos}px ${yClickPos}px`
                        quoteDetails.classList.toggle("quote_hidden")
                    })

                    let xClickPos = e.clientX
                    let yClickPos = e.clientY
                    details.style.transformOrigin = `${xClickPos}px ${yClickPos}px`
                    details.setAttribute("class", "quote_details")

                    let serialSpan = elemCreate("span", { class: "quote_id" }, "Sorszám: " + entry.serialnumber)
                    let details_table = elemCreate("table", { class: "quote_persons_details" })
                    let details_tbody = elemCreate("tbody", {})
                    let trd_detailsRow = elemCreate("tr", {})
                    let thd_details = elemCreate("th", { colspan: "2" }, "Adatok")
                    let trd_myDetailsRow = elemCreate("tr", {})
                    let thd_myDetailsTitle = elemCreate("th", {}, "Vállalkozó")
                    let thd_clientDetailsTitle = elemCreate("th", {}, "Megrendelő")
                    let trd_namesRow = elemCreate("tr", {})
                    let tdd_myName = elemCreate("td", {}, "Név: ")
                    let myName = elemCreate("span", {}, entry.user.fullname)
                    let tdd_clientsName = elemCreate("td", {}, "Név: ")
                    let clientsName = elemCreate("span", {}, entry.clientname)
                    let trd_addressRow = elemCreate("tr", {})
                    let tdd_myAddress = elemCreate("td", {}, "Cím: ")
                    let myAddress = elemCreate("span", {}, entry.user.address)
                    let tdd_clientAddress = elemCreate("td", {}, "Cím: ")
                    let clientAddress = elemCreate("span", {}, entry.clientaddress)
                    let trd_workTypeRow = elemCreate("tr", {})
                    let tdd_workType = elemCreate("td", { colspan: "2" }, "Munka típusa: ")
                    let workType = elemCreate("span", {}, entry.contract_type)

                    details.appendChild(serialSpan)
                    details.appendChild(details_table)
                    details_table.appendChild(details_tbody)
                    details_tbody.appendChild(trd_detailsRow)
                    trd_detailsRow.appendChild(thd_details)
                    details_tbody.appendChild(trd_myDetailsRow)
                    trd_myDetailsRow.appendChild(thd_myDetailsTitle)
                    trd_myDetailsRow.appendChild(thd_clientDetailsTitle)
                    details_tbody.appendChild(trd_namesRow)
                    trd_namesRow.appendChild(tdd_myName)
                    tdd_myName.appendChild(myName)
                    trd_namesRow.appendChild(tdd_clientsName)
                    tdd_clientsName.appendChild(clientsName)
                    details_tbody.appendChild(trd_addressRow)
                    trd_addressRow.appendChild(tdd_myAddress)
                    tdd_myAddress.appendChild(myAddress)
                    trd_addressRow.appendChild(tdd_clientAddress)
                    tdd_clientAddress.appendChild(clientAddress)
                    details_tbody.appendChild(trd_workTypeRow)
                    trd_workTypeRow.appendChild(tdd_workType)
                    tdd_workType.appendChild(workType)


                    /* End of header with details */
                    let hr = elemCreate("hr", {})
                    details.appendChild(hr)

                    /* Start of actual quote data */
                    /* Work list Header */
                    let list_main_table = elemCreate("table", { class: "workphases" })
                    let list_thead = elemCreate("thead", {})
                    let list_header_title_row = elemCreate("tr", {})
                    let list_header_title_th = elemCreate("th", { colspan: "6", class: "listHeader" }, "Munkadíj")
                    let list_header_row = elemCreate("tr", {})
                    let list_th_item = elemCreate("th", { class: "darkbg _centerAlign width_60percent" }, "Tétel")
                    let list_th_normTime = elemCreate("th", { class: "darkbg _centerAlign width_100" }, "Norma idő")
                    let list_th_qty = elemCreate("th", { class: "darkbg _centerAlign width_100" }, "Mennyiség")
                    let list_th_unit = elemCreate("th", { class: "darkbg _centerAlign width_100" }, "Mértékegység")
                    let list_th_singlePrice = elemCreate("th", { class: "darkbg _rightAlign" }, "Egység ár")
                    let list_th_totalPrice = elemCreate("th", { class: "darkbg _rightAlign" }, "Össz költség")

                    list_header_title_row.appendChild(list_header_title_th)
                    list_thead.appendChild(list_header_title_row)
                    list_thead.appendChild(list_header_row)
                    list_header_row.appendChild(list_th_item)
                    list_header_row.appendChild(list_th_normTime)
                    list_header_row.appendChild(list_th_qty)
                    list_header_row.appendChild(list_th_unit)
                    list_header_row.appendChild(list_th_singlePrice)
                    list_header_row.appendChild(list_th_totalPrice)
                    list_main_table.appendChild(list_thead)
                    details.appendChild(list_main_table)
                    /* Work list Body */
                    let list_tbody = elemCreate("tbody", { id: "work_list_body" })
                    let work_prices_sum = 0;


                    /* Inner for loop - WORK */
                    for (let j = 0; j < entry.worklist.length; j++) {
                        let list_tr = elemCreate("tr", { id: "workphase_" + list_tbody.childElementCount })
                        let workEntry = entry.worklist[j]
                        let list_td_item = elemCreate("td", { class: "_leftAlign width_60percent" }, workEntry.workphase + " " + workEntry.note)
                        let list_td_normTime = elemCreate("td", { class: "_centerAlign" }, workEntry.multiplier)
                        let list_td_qty = elemCreate("td", { class: "_centerAlign" }, workEntry.qty)
                        let list_td_unit = elemCreate("td", { class: "_centerAlign" }, workEntry.unit)
                        let list_td_singlePrice = elemCreate("td", { class: "_rightAlign" }, toCurrency(workEntry.normPrice))
                        let list_td_fullPrice = elemCreate("td", { class: "_rightAlign" }, toCurrency(workEntry.fullPrice))
                        list_tr.appendChild(list_td_item)
                        list_tr.appendChild(list_td_normTime)
                        list_tr.appendChild(list_td_qty)
                        list_tr.appendChild(list_td_unit)
                        list_tr.appendChild(list_td_singlePrice)
                        list_tr.appendChild(list_td_fullPrice)
                        list_tbody.appendChild(list_tr)
                        work_prices_sum += workEntry.fullPrice
                        if (list_tbody.childElementCount % 2 == 0) {
                            list_tr.classList.toggle("faded_row")
                        }
                    }
                    list_main_table.appendChild(list_tbody)
                    let work_summary_row = elemCreate("tr", {})
                    let work_summary_placeholder = (elemCreate("td", {}))
                    let work_summary_title = elemCreate("td", { class: "bold darkbg", colspan: "3" }, "Munkadíj összesen: ")
                    let work_summary_sum = elemCreate("td", { class: "bold darkbg _rightAlign", colspan: "2" }, toCurrency(work_prices_sum))
                    work_summary_row.appendChild(work_summary_placeholder)
                    work_summary_row.appendChild(work_summary_title)
                    work_summary_row.appendChild(work_summary_sum)
                    list_main_table.appendChild(work_summary_row)
                    /* End of work list */

                    /* Material list Header */
                    let mat_list_main_table = elemCreate("table", { class: "workphases" })
                    let mat_list_thead = elemCreate("thead", {})
                    let mat_list_header_title_row = elemCreate("tr", {})
                    let mat_list_header_title_th = elemCreate("th", { colspan: "6", class: "listHeader" }, "Anyagköltség")
                    let mat_list_header_row = elemCreate("tr", {})
                    let mat_list_th_item = elemCreate("th", { class: "darkbg _centerAlign width_60percent" }, "Tétel")
                    let mat_list_th_qty = elemCreate("th", { class: "darkbg _centerAlign width_100" }, "Mennyiség")
                    let mat_list_th_unit = elemCreate("th", { class: "darkbg _centerAlign width_100" }, "Mértékegység")
                    let mat_list_th_singlePrice = elemCreate("th", { class: "darkbg _rightAlign" }, "Egység ár")
                    let mat_list_th_totalPrice = elemCreate("th", { class: "darkbg _rightAlign" }, "Össz költség")
                    mat_list_header_title_row.appendChild(mat_list_header_title_th)
                    mat_list_thead.appendChild(mat_list_header_title_row)
                    mat_list_thead.appendChild(mat_list_header_row)
                    mat_list_header_row.appendChild(mat_list_th_item)
                    mat_list_header_row.appendChild(mat_list_th_qty)
                    mat_list_header_row.appendChild(mat_list_th_unit)
                    mat_list_header_row.appendChild(mat_list_th_singlePrice)
                    mat_list_header_row.appendChild(mat_list_th_totalPrice)
                    mat_list_main_table.appendChild(mat_list_thead)
                    details.appendChild(mat_list_main_table)
                    /* Material list Body */
                    let mat_list_tbody = elemCreate("tbody", { id: "mat_list_body" })
                    let mat_prices_sum = 0;


                    /* Inner for loop - MATERIAL */
                    for (let j = 0; j < entry.materiallist.length; j++) {
                        let mat_list_tr = elemCreate("tr", { id: "workphase_" + mat_list_tbody.childElementCount })
                        let matEntry = entry.materiallist[j]
                        let mat_list_td_item = elemCreate("td", { class: "_leftAlign width_60percent" }, matEntry.material)
                        let mat_list_td_qty = elemCreate("td", { class: "_centerAlign" }, matEntry.qty)
                        let mat_list_td_unit = elemCreate("td", { class: "_centerAlign" }, matEntry.unit)
                        let mat_list_td_singlePrice = elemCreate("td", { class: "_rightAlign" }, toCurrency(matEntry.newPrice))
                        let mat_list_td_fullPrice = elemCreate("td", { class: "_rightAlign" }, toCurrency(matEntry.totalPrice))
                        mat_list_tr.appendChild(mat_list_td_item)
                        mat_list_tr.appendChild(mat_list_td_qty)
                        mat_list_tr.appendChild(mat_list_td_unit)
                        mat_list_tr.appendChild(mat_list_td_singlePrice)
                        mat_list_tr.appendChild(mat_list_td_fullPrice)
                        mat_list_tbody.appendChild(mat_list_tr)
                        mat_prices_sum += matEntry.totalPrice
                        if (mat_list_tbody.childElementCount % 2 == 0) {
                            mat_list_tr.classList.toggle("faded_row")
                        }
                    }
                    mat_list_main_table.appendChild(mat_list_tbody)
                    let mat_summary_row = elemCreate("tr", {})
                    let mat_summary_placeholder = (elemCreate("td", {}))
                    let mat_summary_title = elemCreate("td", { class: "bold darkbg", colspan: "3" }, "Anyagköltség összesen: ")
                    let mat_summary_sum = elemCreate("td", { class: "bold darkbg _rightAlign", colspan: "2" }, toCurrency(mat_prices_sum))
                    mat_summary_row.appendChild(mat_summary_placeholder)
                    mat_summary_row.appendChild(mat_summary_title)
                    mat_summary_row.appendChild(mat_summary_sum)
                    mat_list_main_table.appendChild(mat_summary_row)
                    /* End of material list */

                    /* Quote summary footer */
                    let sum_table = elemCreate("table", { class: "quote_summary" })
                    let sum_tableTitleRow = elemCreate("tr", { class: "darkbg _leftAlign" })
                    let sum_rawPriceTitle = elemCreate("th", {}, "Nettó ár")
                    let sum_discountTitle = elemCreate("th", {}, "Kedvezmény %")
                    let sum_discountValueTitle = elemCreate("th", {}, "Kedvezmény")
                    let sum_priceAfterDiscountTitle = elemCreate("th", {}, "Kedvezményes ár")
                    let sum_taxCodeTitle = elemCreate("th", {}, "áfa %")
                    let sum_taxValueTitle = elemCreate("th", {}, "áfa érték")
                    let sum_finalPriceTitle = elemCreate("th", {}, "Bruttó végösszeg")

                    sum_tableTitleRow.appendChild(sum_rawPriceTitle)
                    sum_tableTitleRow.appendChild(sum_discountTitle)
                    sum_tableTitleRow.appendChild(sum_discountValueTitle)
                    sum_tableTitleRow.appendChild(sum_priceAfterDiscountTitle)
                    sum_tableTitleRow.appendChild(sum_taxCodeTitle)
                    sum_tableTitleRow.appendChild(sum_taxValueTitle)
                    sum_tableTitleRow.appendChild(sum_finalPriceTitle)
                    sum_table.appendChild(sum_tableTitleRow)

                    let taxCodeParsed
                    try {
                        taxCodeParsed = parseFloat(entry.taxCode) * 100
                        if (taxCodeParsed.toString() == "NaN") {
                            taxCodeParsed = entry.taxCode
                        }
                    } catch (e) {
                        taxCodeParsed = entry.taxCode
                    }

                    let sum_tableDataRow = elemCreate("tr", { class: "_leftAlign" })
                    let sum_rawPrice = elemCreate("td", {}, toCurrency(entry.netPrice))
                    let sum_discount = elemCreate("td", {}, entry.discount + "%")
                    let sum_discountValue = elemCreate("td", {}, toCurrency(entry.discountValue))
                    let sum_priceAfterDiscount = elemCreate("td", {}, toCurrency(entry.valueAfterDiscount))
                    let sum_taxCode = elemCreate("td", {}, taxCodeParsed)
                    let sum_taxAmount = elemCreate("td", {}, toCurrency(entry.taxAmount))
                    let sum_finalPrice = elemCreate("td", {}, toCurrency(entry.grossTotal))

                    sum_tableDataRow.appendChild(sum_rawPrice)
                    sum_tableDataRow.appendChild(sum_discount)
                    sum_tableDataRow.appendChild(sum_discountValue)
                    sum_tableDataRow.appendChild(sum_priceAfterDiscount)
                    sum_tableDataRow.appendChild(sum_taxCode)
                    sum_tableDataRow.appendChild(sum_taxAmount)
                    sum_tableDataRow.appendChild(sum_finalPrice)
                    sum_table.appendChild(sum_tableDataRow)

                    details.appendChild(sum_table)

                })


                /* End of expanded view */
            }
            spinner.remove()
        }

        ).catch(err =>
            console.error(err),
            spinner.remove())

    } catch (err) {
        spinner.remove()
        console.error("Custom error: " + err)
    }
}

var convertDate = (d) => {
    let date = d.substring(0, 10)
    return date;
}

fetchQuotes()



/* quoteModule.addEventListener("click", (e) => {
    try {
        if(e.target.id.toString().includes("quote_")) {
            quoteDetails.classList.toggle("quote_hidden")
        }

    } catch(err) {
        return
    }
}
) */


