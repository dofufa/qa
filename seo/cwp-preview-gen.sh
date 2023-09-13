## generaters link previews from pdf files
## https://developer.apple.com/library/archive/technotes/tn2444/_index.html

rm -rf preview
mkdir -p preview

for entry in "pdf"/*
do
  infile=$(basename "$entry")
  outfile="preview/preview-"${infile%.*}

  echo "pdftoppm -png -x 300 -y 300 -W 300 -H 300 $entry $outfile"
  pdftoppm -png -x 300 -y 300 -W 900 -H 500 $entry "$outfile.png"
done
