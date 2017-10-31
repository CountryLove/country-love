// for use in schematize: conversion of numbers of various formats to plain js Number

module.exports = (strNum) => {
    let [coeff, ord = false] = strNum.split(' ');
    if(coeff.includes(',')) coeff.split(',').join('');
    if(!ord) return parseFloat(coeff);
    else if(ord === 'million') ord = 1000000;
    else if(ord === 'billion') ord = 1000000000;
    return coeff * ord;
};