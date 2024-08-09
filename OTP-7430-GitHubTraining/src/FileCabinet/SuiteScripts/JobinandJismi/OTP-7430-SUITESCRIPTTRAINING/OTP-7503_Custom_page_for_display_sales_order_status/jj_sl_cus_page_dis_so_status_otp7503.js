/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
/***************************************************************************************
 * *****************
 * OTP Task
 * 
 * OTP-7503:Custom page for display sales order based on the status
 * 
 * 
 * *************************************************************************************
 * ******************
 * 
 * Author: Jobin and Jismi IT Services LLP
 * 
 * Date Created: 02-August-2024
 * 
 * Description: Create a custom form that will display sales orders which need to be fulfilled or billed.The value should be update dynamically based on the filters.
 * 
 * REVISION HISTORY
 * 
 * @version 1.0 OTP-1:02-August-2024: Created the initial build by JJ0327
 * 
 * 
 * ***************************************************************************************
 *******************/
define(['N/record', 'N/search', 'N/ui/serverWidget'],
    /**
 * @param{record} record
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (record, search, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            try{

                if(scriptContext.request.method === 'GET'){
                    let form = serverWidget.createForm({
                        title: 'Sales Order List'
                    });

                    form.clientScriptFileId = 3497;

                    form.addFieldGroup({
                        id: 'custpage_filters',
                        label: 'Filters'
                    })

                    let sts = form.addField({
                        id: 'custpage_status',
                        label: 'Status',
                        type: serverWidget.FieldType.SELECT,
                        container:'custpage_filters',
                        source: 'status'
                    });
                    

                    // sts.addSelectOption({
                    //     value: '',
                    //     text: 'All'
                    // });

                    sts.addSelectOption({
                        value: '',
                        text: '--Select Status--'
                    });
                    sts.defaultValue = '';

                    sts.addSelectOption({
                        value: 'SalesOrd:B',
                        text: 'Pending Fulfillment'
                    });

                    sts.addSelectOption({
                        value: 'SalesOrd:D',
                        text: 'Partially Fulfilled'
                    });

                    sts.addSelectOption({
                        value: 'SalesOrd:E',
                        text: ' Pending Billing/Partially Fulfilled'
                    });

                    sts.addSelectOption({
                        value: 'SalesOrd:F',
                        text: ' Pending Billing'
                    });

                    
                    // let stsSrch = search.create({
                    //     type: search.Type.SALES_ORDER,
                    //     filters:['mainline','is','T'],
                    //     columns:['status']
                    // });

                    // let statuses = {};

                    // stsSrch.run().each(function(result){
                    //     let stsText = result.getText('status');
                    //     // log.debug(stsText);

                    //     let stsValue = result.getValue('status');
                    //     // log.debug(stsValue);

                    //     if(!statuses[stsValue]){

                    //         statuses[stsValue] = stsText;

                    //         sts.addSelectOption({
                    //             value: stsValue,
                    //             text: stsText
                    //         });
                    //     };

                    //     return true;
                    // });

                    log.debug('Working');

                    let cust = form.addField({
                        id: 'custpage_customer',
                        label: 'Customer',
                        type: serverWidget.FieldType.SELECT,
                        container:'custpage_filters',
                        source: 'customer'
                    });

                    log.debug('Working1');

                    let sub = form.addField({
                        id: 'custpage_subsidiary',
                        label: 'Subsidiary',
                        type: serverWidget.FieldType.SELECT,
                        container:'custpage_filters',
                        source: 'subsidiary'
                    });

                    log.debug('Working2');

                    let dep = form.addField({
                        id: 'custpage_department',
                        label: 'Department',
                        type: serverWidget.FieldType.SELECT,
                        container:'custpage_filters',
                        source: 'department'
                    });

                    let subList = form.addSublist({
                        id: 'custpage_sublist',
                        label: 'Sales Order',
                        type: serverWidget.SublistType.LIST
                    });

                    subList.addField({
                        id:'custpage_internalid',
                        label:'Internal Id',
                        type: serverWidget.FieldType.INTEGER
                    });

                    subList.addField({
                        id:'custpage_doc',
                        label:'Document Number',
                        type: serverWidget.FieldType.INTEGER
                    });

                    subList.addField({
                        id:'custpage_date',
                        label:'Date',
                        type: serverWidget.FieldType.DATE
                    });

                    subList.addField({
                        id:'custpage_status',
                        label:'Status',
                        type: serverWidget.FieldType.TEXT
                    });

                    subList.addField({
                        id:'custpage_name',
                        label:'Customer Name',
                        type: serverWidget.FieldType.TEXT
                    });

                    subList.addField({
                        id:'custpage_sub',
                        label:'Subsidiary',
                        type: serverWidget.FieldType.TEXT
                    });

                    subList.addField({
                        id:'custpage_dep',
                        label:'Department',
                        type: serverWidget.FieldType.TEXT
                    });

                    subList.addField({
                        id:'custpage_cla',
                        label:'Class',
                        type: serverWidget.FieldType.TEXT
                    });

                    subList.addField({
                        id:'custpage_subtotal',
                        label:'Subtotal',
                        type: serverWidget.FieldType.CURRENCY
                    });

                    subList.addField({
                        id:'custpage_tax',
                        label:'Tax',
                        type: serverWidget.FieldType.CURRENCY
                    });

                    subList.addField({
                        id:'custpage_total',
                        label:'Total',
                        type: serverWidget.FieldType.CURRENCY
                    });

                    let status = scriptContext.request.parameters.statusVal || '';
                    let customer = scriptContext.request.parameters.customer || '';
                    let subsidiary = scriptContext.request.parameters.subsidiary || '';
                    let department = scriptContext.request.parameters.department || '';

                    sts.defaultValue = status;
                    cust.defaultValue = customer;
                    sub.defaultValue = subsidiary;
                    dep.defaultValue = department;

                    let filter =[['mainline','is','T'],
                                'AND',
                                ['status', 'noneof', 'SalesOrd:A', 'SalesOrd:C', 'SalesOrd:G', 'SalesOrd:H']];

                    if (status) {filter[2] = ['status', 'is', status];}
                    if (customer) {filter.push('AND', ['entity', 'anyof', customer]);}
                    if (subsidiary) {filter.push('AND', ['subsidiary', 'anyof', subsidiary]);}
                    if (department) {filter.push('AND', ['department', 'anyof', department]);}


                    let salesOrderSearch = search.create({
                        type: search.Type.SALES_ORDER,
                        // filters: [['mainline','is','T'],
                        //         'AND',
                        //         filter],
                        filters: filter,
                        columns: [
                            'internalid',
                            'tranid',
                            'trandate',
                            'status',
                            'entity',
                            'subsidiary',
                            'department',
                            'class',
                            'netamountnotax',
                            'taxtotal',
                            'total'
                        ]
                    });
        
                    // Run search and add results to sublist
                    // let resultIndex = 0;
                    // salesOrderSearch.run().each(function(result) {

                    let resultSrch = salesOrderSearch.run();
                    let srch = resultSrch.getRange({
                        start: 0,
                        end: 200
                    });

                    for(let i = 0 ; i< srch.length ; i++){

                        let scrhResult = srch[i];

                        subList.setSublistValue({
                            id: 'custpage_internalid',
                            line: i,
                            value: scrhResult.getValue('internalid')
                        });

                        subList.setSublistValue({
                            id: 'custpage_doc',
                            line: i,
                            value: scrhResult.getValue('tranid')
                        });

                        subList.setSublistValue({
                            id: 'custpage_date',
                            line: i,
                            value: scrhResult.getValue('trandate')
                        });

                        subList.setSublistValue({
                            id:'custpage_status',
                            line: i,
                            value: scrhResult.getValue('status')
                        });

                        subList.setSublistValue({
                            id:'custpage_name',
                            line: i,
                            value: scrhResult.getText('entity')
                        });

                        subList.setSublistValue({
                            id:'custpage_sub',
                            line: i,
                            value: scrhResult.getText('subsidiary')
                        });

                        subList.setSublistValue({
                            id:'custpage_dep',
                            line: i,
                            value: scrhResult.getText('department') || null
                        });

                        subList.setSublistValue({
                            id:'custpage_cla',
                            line: i,
                            value: scrhResult.getText('class') || null
                        });

                        subList.setSublistValue({
                            id:'custpage_subtotal',
                            line: i,
                            value: scrhResult.getValue('netamountnotax') || null
                        });

                        subList.setSublistValue({
                            id:'custpage_tax',
                            line: i,
                            value: scrhResult.getValue('taxtotal') || null
                        });

                        subList.setSublistValue({
                            id:'custpage_total',
                            line: i,
                            value: scrhResult.getValue('total') || null
                        });

                    };

                    scriptContext.response.writePage(form);
                }
            }
            catch(e){
                log.error('Error Found:',e.message);
            };
        }

        return {onRequest}

    });
