REM ^ is used for new line
asciidoctor --backend docbook --out-file - item2.adoc | ^
pandoc --from docbook --to docx --output build/item2.docx
