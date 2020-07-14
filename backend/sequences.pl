#!/usr/bin/perl

use strict;
use warnings;

my %seqs;
my $pairNr = 0;

open(my $fh, '<', $ARGV[0]) or die;

my ($aPos, $bPos, $aLength, $bLength, $aSeq, $bSeq) = (0) x 6;

while(1){
    while(<$fh>){
        if($_ =~ /Length: (\d+)/){
            my $line1 = $_;
            last unless defined $line1;
            if($line1 =~ /\s*(.*?)-.*?\s*Length:\s*(\d+)/gs){
                if($2 >= 20){
                    $aPos = $1;
                    $aLength = $2;
                }
            }
            last;
        }
    }
    if(!$aLength){
        my $line2 = <$fh>;
        my $line3 = <$fh>;
        my $line4 = <$fh>;
        if(!defined $line4){
            last;
        }
    } else {
        my $line2 = <$fh>;
        last unless defined $line2;
        if($line2 =~ /\s*Sequence:\s*(\w+)/gs){
            $aSeq = $1;
        }
        my $line3 = <$fh>;
        last unless defined $line3;
        if($line3 =~ /\s*Sequence:\s*(\w+)/gs){
            $bSeq = $1;
        }
        my $line4 = <$fh>;
        last unless defined $line4;
        if($line4 =~ /\s*(.*?)-.*?\s*Length:\s*(\d+)/gs){
            $bPos = $1;
            $bLength = $2;
        }
        ${${$seqs{"A"}}{$pairNr}}{"len"} = $aLength;
        ${${$seqs{"A"}}{$pairNr}}{"seq"} = $aSeq;
        ${${$seqs{"A"}}{$pairNr}}{"startPos"} = $aPos;
        ${${$seqs{"B"}}{$pairNr}}{"len"} = $bLength;
        ${${$seqs{"B"}}{$pairNr}}{"seq"} = $bSeq;
        ${${$seqs{"B"}}{$pairNr}}{"startPos"} = $bPos;
        $aPos = $bPos = $aLength =  $bLength = $aSeq = $bSeq = 0;
    }
}
for my $sequence(keys %seqs){
    for my $pair(keys %{$seqs{$sequence}}){
        my $len = ${${$seqs{$sequence}}{$pair}}{"len"};
        my $seq = ${${$seqs{$sequence}}{$pair}}{"seq"};
        my $startPos = ${${$seqs{$sequence}}{$pair}}{"startPos"};
        print $sequence, "\t", $pair, "\t", $len, "\t",
        $startPos, "\t", $seq, "\n";
    }
}
