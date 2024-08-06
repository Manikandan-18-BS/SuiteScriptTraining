/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */
/***************************************************************************************
 * *****************
 * OTP Task
 * 
 * OTP-7493:Monthly_Over_Due_Reminder_for_Customer
 * 
 * 
 * *************************************************************************************
 * ******************
 * 
 * Author: Jobin and Jismi IT Services
 * 
 * Date Created: 30-July-2024
 * 
 * Description: Send a email notification to all Customers once a month if they have overdue Invoices.We need to send the Overdue Invoice information till the previous month to the corresponding Customer.The email notification should contain all of the customers overdue invoices.This email notification should contain the Customer Name and Customer Email, Invoice document Number, Invoice Amount, Days Overdue which is attached as a CSV File to the email.The sender of the email should be Sales Rep. If there is no Sales rep for the customer, sender will be a static NetSuite Admin.
 * 
 * REVISION HISTORY
 * 
 * @version 1.0 OTP-1:30-July-2024: Created the initial build by JJ0327
 * 
 * 
 * ***************************************************************************************
 *******************/
define(['N/email', 'N/record', 'N/runtime', 'N/search','N/file'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 */
    (email, record, runtime, search,file) => {
        /**
         * Defines the function that is executed at the beginning of the map/reduce process and generates the input data.
         * @param {Object} inputContext
         * @param {boolean} inputContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {Object} inputContext.ObjectRef - Object that references the input data
         * @typedef {Object} ObjectRef
         * @property {string|number} ObjectRef.id - Internal ID of the record instance that contains the input data
         * @property {string} ObjectRef.type - Type of the record instance that contains the input data
         * @returns {Array|Object|Search|ObjectRef|File|Query} The input data to use in the map/reduce process
         * @since 2015.2
         */

        const getInputData = (inputContext) => {
            try{

                return search.create({
                    type: search.Type.INVOICE,
                    filters:[["trandate","within","lastmonth"], 
                            "AND", 
                            ["mainline","is","T"], 
                            "AND", 
                            ["daysoverdue","greaterthan","0"]],
                    columns:['tranid','entity','email','total','customermain.salesrep','daysoverdue']
                });
            }
            catch(e){
                log.error('Error Found get:',e.message);
            };

        }

        /**
         * Defines the function that is executed when the map entry point is triggered. This entry point is triggered automatically
         * when the associated getInputData stage is complete. This function is applied to each key-value pair in the provided
         * context.
         * @param {Object} mapContext - Data collection containing the key-value pairs to process in the map stage. This parameter
         *     is provided automatically based on the results of the getInputData stage.
         * @param {Iterator} mapContext.errors - Serialized errors that were thrown during previous attempts to execute the map
         *     function on the current key-value pair
         * @param {number} mapContext.executionNo - Number of times the map function has been executed on the current key-value
         *     pair
         * @param {boolean} mapContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {string} mapContext.key - Key to be processed during the map stage
         * @param {string} mapContext.value - Value to be processed during the map stage
         * @since 2015.2
         */

        const map = (mapContext) => {
            try{
                let result = JSON.parse(mapContext.value);

                let custName = result.values.entity.text;
                log.debug('Customer:',custName);
                let custId = result.values.entity.value;
                let doc = result.values.tranid;
                // let custEmail = result.values.email;
                // log.debug('Email:',custEmail);
                let tot = result.values.total;
                let daysOver = result.values.daysoverdue;
                // let salRep = result.values.customermain.salesrep.value;
                // log.debug('SalesRep :',salRep);

                mapContext.write({
                    key : custId,
                    value:{
                        name: custName,
                        // email: custEmail,
                        docNum : doc,
                        amt: tot,
                        days: daysOver
                        // repId: salRep
                    }
                });

            }
            catch(e){
                log.error('Error Found Map:',e.message);
            };

        }

        /**
         * Defines the function that is executed when the reduce entry point is triggered. This entry point is triggered
         * automatically when the associated map stage is complete. This function is applied to each group in the provided context.
         * @param {Object} reduceContext - Data collection containing the groups to process in the reduce stage. This parameter is
         *     provided automatically based on the results of the map stage.
         * @param {Iterator} reduceContext.errors - Serialized errors that were thrown during previous attempts to execute the
         *     reduce function on the current group
         * @param {number} reduceContext.executionNo - Number of times the reduce function has been executed on the current group
         * @param {boolean} reduceContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {string} reduceContext.key - Key to be processed during the reduce stage
         * @param {List<String>} reduceContext.values - All values associated with a unique key that was passed to the reduce stage
         *     for processing
         * @since 2015.2
         */
        const reduce = (reduceContext) => {
            try{

                let cust = reduceContext.key;
                let details = reduceContext.values.map(function(value){
                    return JSON.parse(value);
                });
                log.debug('Details:',details);

                let repId = record.load({
                    type: record.Type.CUSTOMER,
                    id: cust,
                    isDynamic: true
                });

                let rep = repId.getValue('salesrep');
                log.debug('Sales Rep ID :',rep );

                let custEmail = repId.getValue('email');
                log.debug('Email:',custEmail);

                let csvContent = 'Customer Name, Customer Email, Document Number, Amount, Days Overdue\n';
            
                details.forEach(function(data){
                    csvContent += data.name+','+custEmail+','+data.docNum+','+data.amt+','+data.days+'\n'
                });

                let csvFile = file.create({
                    name: 'Monthly_overdue_Invoices_'+cust+'.csv',
                    fileType: file.Type.CSV,
                    contents: csvContent,
                    folder: -15,
                });

                let csvFileId = csvFile.save();

                if(rep){

                    email.send({
                        author: rep,
                        recipients: custEmail,
                        subject: 'Monthly_overdue_Invoices_Remainder',
                        body:'Please check the attached file',
                        attachments:[file.load({
                            id: csvFileId
                        })]
                    });
                }
                else {

                    email.send({
                        author: -5,
                        recipients: custEmail,
                        subject: 'Monthly_overdue_Invoices_Remainder',
                        body:'Please check the attached file',
                        attachments:[file.load({
                            id:csvFileId
                        })]
                    });
                }
            }
            catch(e){
                log.error('Error Found Reduce:',e.message);
            };

        }


        /**
         * Defines the function that is executed when the summarize entry point is triggered. This entry point is triggered
         * automatically when the associated reduce stage is complete. This function is applied to the entire result set.
         * @param {Object} summaryContext - Statistics about the execution of a map/reduce script
         * @param {number} summaryContext.concurrency - Maximum concurrency number when executing parallel tasks for the map/reduce
         *     script
         * @param {Date} summaryContext.dateCreated - The date and time when the map/reduce script began running
         * @param {boolean} summaryContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {Iterator} summaryContext.output - Serialized keys and values that were saved as output during the reduce stage
         * @param {number} summaryContext.seconds - Total seconds elapsed when running the map/reduce script
         * @param {number} summaryContext.usage - Total number of governance usage units consumed when running the map/reduce
         *     script
         * @param {number} summaryContext.yields - Total number of yields when running the map/reduce script
         * @param {Object} summaryContext.inputSummary - Statistics about the input stage
         * @param {Object} summaryContext.mapSummary - Statistics about the map stage
         * @param {Object} summaryContext.reduceSummary - Statistics about the reduce stage
         * @since 2015.2
         */
        const summarize = (summaryContext) => {

        }

        return {getInputData, map, reduce, summarize}

    });
