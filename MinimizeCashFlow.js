const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function minimizeCashFlow(transactions, friendNames) {
    const numFriends = transactions.length;

    const netAmount = new Array(numFriends).fill(0);
    for (let p = 0; p < numFriends; p++) {
        for (let q = 0; q < numFriends; q++) {
            netAmount[p] += transactions[q][p] - transactions[p][q];
        }
    }

    function getMax(netAmount) {
        let maxIndex = 0;
        for (let i = 1; i < netAmount.length; i++) {
            if (netAmount[i] > netAmount[maxIndex]) {
                maxIndex = i;
            }
        }
        return maxIndex;
    }

    function getMin(netAmount) {
        let minIndex = 0;
        for (let i = 1; i < netAmount.length; i++) {
            if (netAmount[i] < netAmount[minIndex]) {
                minIndex = i;
            }
        }
        return minIndex;
    }

    function settleDebt(netAmount, payments) {
        const maxCreditor = getMax(netAmount);
        const maxDebtor = getMin(netAmount);

        if (netAmount[maxCreditor] === 0 && netAmount[maxDebtor] === 0) {
            return;
        }

        const minAmount = Math.min(-netAmount[maxDebtor], netAmount[maxCreditor]);
        netAmount[maxCreditor] -= minAmount;
        netAmount[maxDebtor] += minAmount;

        payments.push({ from: maxDebtor, to: maxCreditor, amount: minAmount });

        settleDebt(netAmount, payments);
    }

    const payments = [];
    settleDebt(netAmount, payments);

    console.log("Final payments to settle debts:");
    const groupedPayments = payments.reduce((grouped, payment) => {
        if (!grouped[payment.to]) {
            grouped[payment.to] = [];
        }
        grouped[payment.to].push(payment);
        return grouped;
    }, {});


    for (const payer in groupedPayments) {
        const paymentsForPayer = groupedPayments[payer];
        paymentsForPayer.forEach(payment => {
            console.log(`${friendNames[payment.to]} has to pay ${payment.amount} to ${friendNames[payment.from]}`);
        });
    }

}


readline.question("How many friends are in this financial drama? 🤔: ", (numFriends) => {
    numFriends = parseInt(numFriends);
    const transactions = Array.from({ length: numFriends }, () => new Array(numFriends).fill(0));
    const friendNames = [];
    let transactionCount = 0;

    function getFriendName(i) {
        readline.question(`Enter the name of friend ${i + 1}: `, (name) => {
            friendNames.push(name);
            if (i < numFriends - 1) {

                getFriendName(i + 1);
            } else {
                getTransaction();
            }
        });
    }


    function getTransaction() {
        console.log(`Transaction ${transactionCount + 1}:`);
        readline.question("Who is paying? 💸 (enter -1 to finish): ", (payer) => {
            if (payer === '-1') {
                minimizeCashFlow(transactions, friendNames);
                readline.close();
            } else {

                const payerIndex = friendNames.indexOf(payer);
                if (payerIndex === -1) {
                    console.error(`Whoa there! "${payer}" doesn't seem to be in our friend group.  Try again! 😜`);
                    getTransaction();
                    return;
                }

                readline.question("Who are they paying for? 🤔 (enter 'all' for everyone): ", (payees) => {
                    if (payees.toLowerCase() === 'all') {

                        readline.question("How much is the payment? 💰: ", (amount) => {
                            amount = parseFloat(amount);
                            const payeeList = friendNames.map((_, index) => index);
                            const dividedAmount = amount / payeeList.length;
                            payeeList.forEach(payee => {
                                transactions[payerIndex][payee] += dividedAmount;
                            });
                            transactionCount++;
                            getTransaction();
                        });
                    } else {

                        const payeeList = payees.split(',').map(payee => {

                            const payeeIndex = friendNames.indexOf(payee);
                            if (payeeIndex === -1) {
                                console.error(`Oops! "${payee}" isn't in our friend group.  Double-check the names! 😜`);
                                getTransaction();
                                return;
                            }
                            return payeeIndex;
                        });

                        readline.question("How much is the payment? 💰: ", (amount) => {
                            amount = parseFloat(amount);
                            if (!isNaN(payerIndex) && !isNaN(amount)) {
                                const dividedAmount = amount / (payeeList.length + 1);
                                payeeList.forEach(payee => {
                                    transactions[payerIndex][payee] += dividedAmount;
                                });
                                transactions[payerIndex][payerIndex] += dividedAmount;
                                transactionCount++;
                                getTransaction();
                            } else {
                                console.error("Invalid input. Please try again. Let's be serious about this money stuff! 😜");
                                getTransaction();
                            }
                        });
                    }
                });
            }
        });
    }


    getFriendName(0);
});