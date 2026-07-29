import os
import sys
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 9)
        self.setFillColor(colors.HexColor("#64748B"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 11 * inch - 36, "AMPPERE CABLE — Website Upgrades & Improvement Report")
            self.setStrokeColor(colors.HexColor("#E2E8F0"))
            self.setLineWidth(0.75)
            self.line(54, 11 * inch - 42, 8.5 * inch - 54, 11 * inch - 42)
            
        # Footer (all pages)
        footer_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(8.5 * inch - 54, 36, footer_text)
        self.drawString(54, 36, "Amppere Cable Project — Simple Summary of Changes")
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.75)
        self.line(54, 48, 8.5 * inch - 54, 48)
        
        self.restoreState()


def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    # Custom Brand Colors
    primary_color = colors.HexColor("#DC2626")   # Amppere Red
    dark_heading = colors.HexColor("#0F172A")     # Slate 900
    body_text_color = colors.HexColor("#334155")  # Slate 700
    accent_bg = colors.HexColor("#FEF2F2")        # Light red background box
    border_color = colors.HexColor("#FCA5A5")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=primary_color,
        spaceAfter=4
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor("#475569"),
        spaceAfter=12
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=dark_heading,
        spaceBefore=16,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=primary_color,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=body_text_color,
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'Bullet_Custom',
        parent=body_style,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=5
    )

    callout_style = ParagraphStyle(
        'CalloutText',
        parent=body_style,
        fontName='Helvetica-Oblique',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor("#991B1B")
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=body_style,
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=colors.white
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=body_style,
        fontSize=9,
        leading=12,
        spaceAfter=0
    )

    story = []

    # Title Banner Block
    story.append(Paragraph("AMPPERE CABLE", title_style))
    story.append(Paragraph("<b>Website Transformation Report — Simple Summary of Changes</b>", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=primary_color, spaceBefore=0, spaceAfter=10))

    # Meta Table Info
    meta_data = [
        [Paragraph("<b>Original Website:</b>", body_style), Paragraph("https://www.ampperecable.in/", body_style)],
        [Paragraph("<b>Project Version:</b>", body_style), Paragraph("New Modern Cloned Version", body_style)],
        [Paragraph("<b>Summary Scope:</b>", body_style), Paragraph("Design, Features, SEO, Certificates & Content Changes", body_style)]
    ]
    t_meta = Table(meta_data, colWidths=[1.8*inch, 5.2*inch])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#E2E8F0")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#F1F5F9")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 12))

    # Executive Summary Box
    summary_text = (
        "<b>Summary in Plain Words:</b> The old Amppere Cable website was basic and static. "
        "In this new cloned version, the entire website has been redesigned from scratch to look premium, modern, "
        "and interactive. Everything has been upgraded—from how the website opens to how products are shown, "
        "how cables can be visually inspected layer-by-layer, how fast pages load, how certificates can be downloaded, "
        "and how easily Google can find the website."
    )
    t_summary = Table([[Paragraph(summary_text, callout_style)]], colWidths=[7.0*inch])
    t_summary.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), accent_bg),
        ('BOX', (0,0), (-1,-1), 1, border_color),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_summary)
    story.append(Spacer(1, 12))

    # SECTION 1: DESIGN & LOOK
    story.append(Paragraph("1. Modern Design & Visual Upgrades", h1_style))
    
    design_points = [
        ("New Premium Look & Color Theme", "Replaced the old static layout with a modern red, white, and sleek dark theme that looks high-end and professional."),
        ("Glass Navigation Bar (Header)", "Created a smooth top menu that stays visible at the top as you scroll down. Hovering over menu items shows product categories with picture previews."),
        ("Mobile-Friendly Menu", "Designed a smooth slide-out menu specifically for smartphones and tablets so mobile users can navigate easily."),
        ("Hero Banner Slider", "Added a big, auto-sliding banner on the homepage displaying HD images of cables, key highlights, and quick buttons to contact or view products."),
        ("Modern Footer", "Redesigned the bottom section of the website with direct quick links, business address, quick contact numbers, social media links, and a newsletter subscription box.")
    ]
    for title, desc in design_points:
        story.append(Paragraph(f"• <b>{title}:</b> {desc}", bullet_style))

    story.append(Spacer(1, 10))

    # SECTION 2: INTERACTIVE FEATURES
    story.append(Paragraph("2. Cool Interactive Features Added", h1_style))

    interactive_points = [
        ("Custom Animated Mouse Cursor", "When browsing on a computer, the mouse pointer has a modern custom design that grows and glows smoothly when you hover over buttons or links."),
        ("Opening Loading Screen (Preloader)", "When someone opens the website, a smooth loading animation appears showing a percentage counter and cable logo before the site opens."),
        ("Smooth Page Switching", "When moving from one page to another (e.g. Home to About), pages fade smoothly without screen flickers."),
        ("Interactive 3D Cable Structure Inspector", "Added a visual cable structure tool where users can click to inspect cable layers one by one: <i>Conductor, Insulation, Inner Sheath, Armouring, and Outer Sheath</i>. It also includes short videos showing how cables are made."),
        ("Customer Testimonials Slider", "Added a sliding reviews section displaying client ratings, feedback, and customer designations."),
        ("Interactive Google Map & FAQs", "The contact page now includes an interactive Google Map location, one-click WhatsApp/Call buttons, and expandable FAQ answer boxes.")
    ]
    for title, desc in interactive_points:
        story.append(Paragraph(f"• <b>{title}:</b> {desc}", bullet_style))

    story.append(Spacer(1, 10))

    # SECTION 3: PAGES & CONTENT
    story.append(Paragraph("3. New Pages & Content Sections", h1_style))

    pages_points = [
        ("Product Showcase & Dedicated Product Pages", "Built a clean product showcase where products are grouped into categories. Clicking any product opens a full dedicated page showing technical specifications, usage areas, and a direct inquiry form."),
        ("Company Blog & Article Section", "Created a full blog hub with a live search bar, topic filters, reading time estimates, and individual article reader pages."),
        ("Clients Showcase", "Created a dedicated section showcasing top corporate clients like Mahindra Aerospace, BSE, Capgemini, Union, and Nexus with company logos."),
        ("About & Founder Pages", "Designed detailed pages covering the company's story, leadership vision, manufacturing facilities, quality policy, and core business goals.")
    ]
    for title, desc in pages_points:
        story.append(Paragraph(f"• <b>{title}:</b> {desc}", bullet_style))

    story.append(Spacer(1, 10))

    # SECTION 4: CERTIFICATES
    story.append(Paragraph("4. Quality & Government Certificates Added", h1_style))
    story.append(Paragraph("Added official government and quality certificates directly onto the website so customers can view and download them easily:", body_style))

    cert_table_data = [
        [Paragraph("Certificate", table_header_style), Paragraph("What It Proves", table_header_style), Paragraph("Where It Appears On Site", table_header_style)],
        [Paragraph("<b>ISO 9001:2015</b>", table_cell_style), Paragraph("International Quality Management Standard", table_cell_style), Paragraph("Download button on About Page & Footer", table_cell_style)],
        [Paragraph("<b>GST Certificate</b>", table_cell_style), Paragraph("Official Legal Business Tax Registration", table_cell_style), Paragraph("Direct downloadable PDF file", table_cell_style)],
        [Paragraph("<b>RoHS Certificate</b>", table_cell_style), Paragraph("Environmental & Hazard Safety Compliance", table_cell_style), Paragraph("Downloadable document for B2B buyers", table_cell_style)],
        [Paragraph("<b>CE Certification</b>", table_cell_style), Paragraph("European Safety Standard Approval", table_cell_style), Paragraph("Display badge & full image viewer", table_cell_style)],
        [Paragraph("<b>UL Certification</b>", table_cell_style), Paragraph("Underwriters Laboratories Safety Seal", table_cell_style), Paragraph("Safety badge on product & quality sections", table_cell_style)]
    ]
    t_cert = Table(cert_table_data, colWidths=[1.8*inch, 2.7*inch, 2.5*inch])
    t_cert.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary_color),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_cert)
    story.append(Spacer(1, 10))

    # SECTION 5: SEO & GOOGLE SEARCH
    story.append(Paragraph("5. Google Search & SEO Upgrades", h1_style))

    seo_points = [
        ("Automatic Page Titles & Descriptions", "When moving from page to page, the browser title and Google description change automatically for every specific page."),
        ("High-Ranking Keyword Research", "Researched and integrated search keywords people use on Google when looking to buy cables (like <i>Fire Survival Cable Manufacturers in India</i>, <i>LT Copper Wires</i>, etc.)."),
        ("Compressed HD Images", "Converted all website images to modern WebP format so images look sharp but load super fast."),
        ("SEO Strategy Documents Created", "Prepared 3 detailed SEO guides in the project folder covering Keyword Research, Meta Titles, and Image Optimization.")
    ]
    for title, desc in seo_points:
        story.append(Paragraph(f"• <b>{title}:</b> {desc}", bullet_style))

    story.append(Spacer(1, 14))

    # SECTION 6: SUMMARY TABLE
    story.append(Paragraph("6. Quick Comparison Table", h1_style))

    comp_table_data = [
        [Paragraph("Feature", table_header_style), Paragraph("Original Old Website", table_header_style), Paragraph("New Cloned Website", table_header_style)],
        [Paragraph("<b>Visual Design</b>", table_cell_style), Paragraph("Basic, static layout", table_cell_style), Paragraph("Modern, glassmorphic, red & dark theme", table_cell_style)],
        [Paragraph("<b>Navigation</b>", table_cell_style), Paragraph("Standard basic menu", table_cell_style), Paragraph("Mega menu with pictures + mobile menu", table_cell_style)],
        [Paragraph("<b>Speed & Performance</b>", table_cell_style), Paragraph("Slow page reloads", table_cell_style), Paragraph("Ultra-fast instant switching (Single Page App)", table_cell_style)],
        [Paragraph("<b>Cable Inspection</b>", table_cell_style), Paragraph("Static photos only", table_cell_style), Paragraph("Interactive 3D layer viewer + manufacturing videos", table_cell_style)],
        [Paragraph("<b>Certificates</b>", table_cell_style), Paragraph("Not easily viewable", table_cell_style), Paragraph("1-click downloads for ISO, GST, RoHS, CE, UL", table_cell_style)],
        [Paragraph("<b>SEO (Google Rank)</b>", table_cell_style), Paragraph("Very basic", table_cell_style), Paragraph("Dynamic titles, meta tags & targeted keywords", table_cell_style)]
    ]
    t_comp = Table(comp_table_data, colWidths=[1.5*inch, 2.5*inch, 3.0*inch])
    t_comp.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary_color),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_comp)

    story.append(Spacer(1, 16))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#CBD5E1"), spaceBefore=0, spaceAfter=10))
    story.append(Paragraph("<i>Official Amppere Cable Website Upgrades & Improvements Document</i>", ParagraphStyle(
        'FooterEnd', parent=body_style, alignment=1, fontSize=9, textColor=colors.HexColor("#64748B")
    )))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF successfully built: {filename}")

if __name__ == '__main__':
    output_path = sys.argv[1] if len(sys.argv) > 1 else "Amppere_Cable_Website_Changes_Document.pdf"
    build_pdf(output_path)
