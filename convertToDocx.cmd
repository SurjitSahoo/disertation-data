@REM ^ is used for new line
asciidoctor --backend docbook --out-file - participant2.adoc | ^
pandoc --from docbook --to docx --output build/participant2.docx