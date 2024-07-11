/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/record', 'N/runtime', 'N/search'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 */
    (email, record, runtime, search) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {

        if(scriptContext.type === scriptContext.UserEventType.CREATE){
            
            let newRec = scriptContext.newRecord;
            let custId = newRec.getValue('entity');
            log.debug('Customer Id: ', custId);

            let custRec = search.lookupFields({
                type: search.Type.CUSTOMER,
                id: custId,
                columns:['salesrep']
            });

            let salRep = custRec.salesrep[0].value;
            log.debug('Sales rep:',salRep);

            let sender= -5;
        try{

            let custSrch = search.create({
                type: search.Type.SALES_ORDER,
                filters:[["status","anyof","SalesOrd:D","SalesOrd:F","SalesOrd:E","SalesOrd:B"],
                        'AND',
                        ["mainline","is","T"]],
                columns:[
                    search.createColumn({
                        name: "entity",
                        summary: "GROUP",
                        label: "Name"
                    }),
                    search.createColumn({
                        name:'formulanumeric',
                        summary:'SUM',
                        formula:"CASE WHEN {type}= 'Order' THEN 1 ELSE 0 END",
                        label:'Sales Order'
                    })

                ]
            });
            let srchRun = custSrch.run().getRange({
                start: 0,
                end: 10
            });

            srchRun.forEach(function(result){

                let custName = result.getValue(custSrch.columns[0]);
                log.debug('Cust:',custName);

                let salNo = result.getValue(custSrch.columns[1]);
                log.debug('Sal No:',salNo);

            // let srchLoad = search.lookupFields({
            //     type: search.Type.CUSTOMER,
            //     id: 153,
            //     columns:['name','formulanumeric']
            // });

            //      let custName = srchLoad.entity[0].value;
            //     log.debug('Cust:',custName);

            //     let salNo =srchLoad.entity[0].value;
            //     log.debug('Sal No:',salNo);



                if(custId === custName && salNo>5){

                    email.send({
                        author: sender,
                        recipients: salRep,
                        subject:'Intimation mail',
                        body: 'The customer '+custName +'has more than 5 Open Sales Order'
                    });

                    log.debug('value:',custName);

                };

                return true;
            });
        }
        catch(e){
            log.error('Error in Sending Mail',e.message);
        };



        // let crtSal = record.create({
        //     type: record.Type.SALES_ORDER,
        //     isDynamic: true
        // });

        // crtSal.setValue('entity',325);
        // crtSal.setValue('memo', "Sales is Order Created");

        // crtSal.selectNewLine({
        //     sublistId: 'item',
        // });

        // crtSal.setCurrentSublistValue({
        //     sublistId: 'item',
        //     fieldId: 'item',
        //     Value:266
        // });

        // crtSal.setCurrentSublistValue({
        //     sublistId: 'item',
        //     fieldId:'quantity',
        //     Value:3
        // });

        // crtSal.commitLine({
        //     sublistId:'item'
        // });

        // let salSave = crtSal.save({
        //     enableSourcing: true,
        //     ignoreMandatoryFields: true
        // });



        }
        
    }


        return {beforeLoad, beforeSubmit, afterSubmit}

    });
